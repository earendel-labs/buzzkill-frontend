"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_HIVE_DATA } from "@/subquery/getAllHiveData";
import {
  Environment,
  HiveHatchling,
  Resource,
  StakedNFT,
  StakedNFTsData,
  SpecificEnvironmentData,
} from "@/types/Environment";
import { useReadHiveStakingMaxBeesPerHive } from "@/hooks/HiveStaking";
import { useRouter } from "next/navigation";
import { useReadContracts } from "wagmi";
import HiveStakingAbiJson from "@/app/libs/abi/HiveStaking.json";
import { Abi } from "abitype";
import { pollUntilCondition } from "@/utils/polling";
import { logger } from "@/utils/logger";

// --------------------------------------------------------------------------
// 1) Define your context interface
// --------------------------------------------------------------------------
interface HivesState {
  environments: Environment[]; // the loaded environment(s)
  hivesMap: Map<number, HiveHatchling>;
  resources: Resource[];
  stakedNFTs: StakedNFT[];
  maxBeesMap: Map<number, number>;
  isRefreshing: boolean;
}

type HivesAction =
  | { type: "SET_ENVIRONMENTS"; payload: Environment[] }
  | { type: "SET_HIVES_MAP"; payload: Map<number, HiveHatchling> }
  | { type: "SET_RESOURCES"; payload: Resource[] }
  | { type: "SET_STAKED_NFTS"; payload: StakedNFT[] }
  | { type: "SET_MAX_BEES_MAP"; payload: Map<number, number> }
  | { type: "SET_IS_REFRESHING"; payload: boolean };

interface HivesContextProps {
  environments: Environment[];
  hivesMap: Map<number, HiveHatchling>;
  resources: Resource[];
  stakedNFTs: StakedNFT[];
  filteredStakedNFTs: StakedNFT[];
  maxBeesMap: Map<number, number>;
  getHiveById: (hiveId: number) => HiveHatchling | undefined;
  getStakedNFTsByHiveId: (hiveId: number) => StakedNFT[];
  getMaxBeesByHiveId: (hiveId: number) => number | undefined;
  loading: boolean;
  error: Error | null;
  refreshHiveData: (
    affectedBeeId?: number,
    action?: "stake" | "unstake"
  ) => Promise<void>;
  isRefreshing: boolean;
}

// --------------------------------------------------------------------------
// 2) Create the context
// --------------------------------------------------------------------------
const HivesContext = createContext<HivesContextProps | undefined>(undefined);

export const useHives = (): HivesContextProps => {
  const context = useContext(HivesContext);
  if (!context) {
    throw new Error("useHives must be used within a HivesProvider");
  }
  return context;
};

const HiveStakingABI = HiveStakingAbiJson as Abi;
const HIVE_STAKING_ADDRESS =
  (process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS as `0x${string}`) ||
  ("" as `0x${string}`);

if (!HIVE_STAKING_ADDRESS) {
  throw new Error(
    "NEXT_PUBLIC_HIVE_STAKING_ADDRESS is not defined in the environment variables."
  );
}

// --------------------------------------------------------------------------
// 3) The Provider's Props (accept environmentId or environmentName, etc.)
// --------------------------------------------------------------------------
interface HivesProviderProps {
  children: ReactNode;
  environmentId: number; // or environmentName, depending on your approach
}

// --------------------------------------------------------------------------
// 4) The reducer
// --------------------------------------------------------------------------
const hivesReducer = (state: HivesState, action: HivesAction): HivesState => {
  switch (action.type) {
    case "SET_ENVIRONMENTS":
      return { ...state, environments: action.payload };
    case "SET_HIVES_MAP":
      return { ...state, hivesMap: action.payload };
    case "SET_RESOURCES":
      return { ...state, resources: action.payload };
    case "SET_STAKED_NFTS":
      return { ...state, stakedNFTs: action.payload };
    case "SET_MAX_BEES_MAP":
      return { ...state, maxBeesMap: action.payload };
    case "SET_IS_REFRESHING":
      return { ...state, isRefreshing: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------
// 5) The Provider
// --------------------------------------------------------------------------
export const HivesProvider: React.FC<HivesProviderProps> = ({
  children,
  environmentId, // passed in from the layout
}) => {
  const [state, dispatch] = useReducer(hivesReducer, {
    environments: [],
    hivesMap: new Map(),
    resources: [],
    stakedNFTs: [],
    maxBeesMap: new Map(),
    isRefreshing: false,
  });
  const router = useRouter();

  // Local state to hold combined staked NFTs across pages
  const [allStakedNFTs, setAllStakedNFTs] = useState<StakedNFT[]>([]);

  // We'll also track which single environment object we loaded
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>();

  // 5.1) Apollo queries
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchAllHiveData,
  } = useQuery<StakedNFTsData>(GET_ALL_HIVE_DATA, {
    fetchPolicy: "network-only",
    variables: { after: null },
  });

  useEffect(() => {
    logger.log("GET_ALL_HIVE_DATA State:", { data, loading, error });
  }, [data, loading, error]);

  // 5.2) read on-chain data
  const {
    data: maxBeesData,
    isLoading: maxBeesLoading,
    error: maxBeesError,
  } = useReadHiveStakingMaxBeesPerHive();

  // We'll read production data for each hive
  const contracts = useMemo(() => {
    const hiveIds = Array.from(state.hivesMap.keys());
    logger.log("Preparing contracts for hives:", hiveIds);
    return hiveIds.map((hiveId) => ({
      address: HIVE_STAKING_ADDRESS,
      abi: HiveStakingABI,
      functionName: "getHiveProduction",
      args: [environmentId, hiveId],
    }));
  }, [state.hivesMap]);

  const {
    data: productionData,
    isError: productionError,
    isLoading: productionLoading,
    refetch: refetchProductionData,
  } = useReadContracts({ contracts });

  // ------------------------------------------------------------------------
  // 6) Fetch environment JSON from environment.json => find the matched env
  //    Then fetch the actual environment data (e.g. /Data/Maps/volcanic.json)
  // ------------------------------------------------------------------------
  useEffect(() => {
    const fetchEnvData = async () => {
      try {
        // 1) load the array of environment definitions from environment.json
        const envListRes = await fetch("/Data/environment.json");
        if (!envListRes.ok) {
          throw new Error(`Failed to load environment.json`);
        }
        const envListData = await envListRes.json();

        // envListData should have an array like envListData.environments
        const environmentsList: Environment[] = envListData.environments;
        // find the environment matching the environmentId
        const foundEnv = environmentsList.find(
          (env) => env.id === environmentId
        );
        if (!foundEnv) {
          logger.error(`No environment found for ID=${environmentId}`);
          return;
        }

        // store this environment object (the "shallow" info from environment.json)
        setSelectedEnvironment(foundEnv);

        // 2) Now fetch the environment’s actual JSON data (like /Data/Maps/volcanic.json)
        const specificEnvRes = await fetch(foundEnv.jsonUrl);
        if (!specificEnvRes.ok) {
          throw new Error(
            `Failed to load environment details from ${foundEnv.jsonUrl}`
          );
        }
        const fetchedData: SpecificEnvironmentData =
          await specificEnvRes.json();

        // Because the user might want to store the environment data in state
        // (the original code uses dispatch to store in state.environments)
        dispatch({
          type: "SET_ENVIRONMENTS",
          payload: [fetchedData.environment as Environment],
        });
      } catch (err) {
        logger.error("Error in fetchEnvData:", err);
      }
    };

    fetchEnvData();
  }, [environmentId]);

  useEffect(() => {
    logger.log("Environments array in the provider:", state.environments);
  }, [state.environments]);
  // ------------------------------------------------------------------------
  // 7) Once we have environment data in state, gather hives / resources, etc.
  // ------------------------------------------------------------------------
  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        // If no environment data is loaded yet, skip
        if (state.environments.length === 0) {
          return;
        }

        const newHivesMap = new Map<number, HiveHatchling>();
        const newResources: Resource[] = [];
        let hiveCount = 0;

        // We might only have 1 environment in state (the one we fetched),
        // but let's do a forEach anyway, in case you expand later
        state.environments.forEach((env) => {
          env.resources?.forEach((resource) => {
            if (resource.resourceType === "Hive") {
              const hive = resource as HiveHatchling;
              newHivesMap.set(hive.hiveId, hive);
              hiveCount++;
            } else {
              newResources.push(resource as Resource);
            }
          });
        });

        logger.log(`Total hives: ${hiveCount}`);
        logger.log("Hives map updated:", newHivesMap);
        logger.log("Resources updated:", newResources);

        dispatch({ type: "SET_HIVES_MAP", payload: newHivesMap });
        dispatch({ type: "SET_RESOURCES", payload: newResources });

        // Update maxBees per hive
        if (!maxBeesLoading && maxBeesData) {
          const maxBees = Number(maxBeesData);
          if (!isNaN(maxBees)) {
            const newMaxBeesMap = new Map<number, number>();
            newHivesMap.forEach((_, hiveId) => {
              newMaxBeesMap.set(hiveId, maxBees);
              logger.log(`Max bees set for hive ID ${hiveId}: ${maxBees}`);
            });
            dispatch({ type: "SET_MAX_BEES_MAP", payload: newMaxBeesMap });
          } else {
            logger.error("Invalid maxBeees value:", maxBeesData);
          }
        }

        // Update each hive's productivityValue
        if (!productionLoading && productionData && productionData.length > 0) {
          const updatedHivesMap = new Map<number, HiveHatchling>(newHivesMap);

          productionData.forEach((result, index) => {
            const hiveId = Array.from(newHivesMap.keys())[index];
            if (result && !result.error && result.result) {
              // result.result is [bigint, bigint], etc.
              const [totalProduction] = result.result as [bigint, bigint];
              const hive = updatedHivesMap.get(hiveId);
              if (hive) {
                updatedHivesMap.set(hiveId, {
                  ...hive,
                  productivityValue: Number(totalProduction),
                });
              }
            }
          });

          dispatch({ type: "SET_HIVES_MAP", payload: updatedHivesMap });
        }
      } catch (err) {
        logger.error("Error in combined data fetch:", err);
      }
    };

    fetchAndCombineData();
  }, [
    state.environments,
    maxBeesData,
    maxBeesLoading,
    productionData,
    productionLoading,
  ]);

  // ------------------------------------------------------------------------
  // 8) Gather all staked NFTs data
  // ------------------------------------------------------------------------
  // 8.1) recursively fetch edges from subquery
  const fetchAllEdges = async (
    cursor: string | null,
    existingEdges: StakedNFT[]
  ): Promise<void> => {
    try {
      const { data: newData } = await fetchMore({
        variables: { after: cursor },
      });

      // Log the fetched data
      logger.log("checking if we enter here");
      logger.log("Fetched staked data:", newData);

      if (!newData || !newData.stakedNFTs) {
        return;
      }

      const newEdges = [
        ...existingEdges,
        ...newData.stakedNFTs.edges.map((e) => e.node),
      ];
      const pageInfo = newData.stakedNFTs.pageInfo;

      if (pageInfo.hasNextPage) {
        await fetchAllEdges(pageInfo.endCursor, newEdges);
      } else {
        setAllStakedNFTs(newEdges);
      }
    } catch (err) {
      logger.error("Error fetching all edges:", err);
    }
  };

  // 8.2) load the data when initial subquery result arrives
  useEffect(() => {
    if (data && data.stakedNFTs && data.stakedNFTs.edges.length > 0) {
      const firstEdges = data.stakedNFTs.edges.map((e) => e.node);
      const { hasNextPage, endCursor } = data.stakedNFTs.pageInfo;

      if (hasNextPage) {
        fetchAllEdges(endCursor, firstEdges);
      } else {
        setAllStakedNFTs(firstEdges);
      }
    }
  }, [data]);

  // 8.3) store in the reducer
  useEffect(() => {
    if (allStakedNFTs.length > 0) {
      dispatch({ type: "SET_STAKED_NFTS", payload: allStakedNFTs });
      logger.log("All staked NFTs data set:", allStakedNFTs);
    }
  }, [allStakedNFTs]);

  // ------------------------------------------------------------------------
  // 9) Utility functions
  // ------------------------------------------------------------------------

  // 1) Create a "filtered" stakedNFT array specifically for environmentId
  const filteredStakedNFTs = useMemo(() => {
    return state.stakedNFTs.filter(
      (nft) => Number(nft.environmentId.environmentId) === environmentId
    );
  }, [state.stakedNFTs, environmentId]);

  // 2) Update your getStakedNFTsByHiveId to use the filtered list
  const getStakedNFTsByHiveId = useCallback(
    (hiveId: number): StakedNFT[] => {
      // Now we only look at staked NFTs that match *this environment*.
      return filteredStakedNFTs.filter(
        (nft) => Number(nft.hiveId.hiveId) === hiveId
      );
    },
    [filteredStakedNFTs]
  );

  const getHiveById = (hiveId: number): HiveHatchling | undefined => {
    return state.hivesMap.get(hiveId);
  };

  const getMaxBeesByHiveId = (hiveId: number): number | undefined => {
    return state.maxBeesMap.get(hiveId);
  };

  // 9.1) Refresh data and poll subquery
  const refreshHiveData = async (
    affectedBeeId?: number,
    action?: "stake" | "unstake"
  ) => {
    dispatch({ type: "SET_IS_REFRESHING", payload: true });
    logger.log(
      `refreshHiveData called with affectedBeeId: ${affectedBeeId}, action: ${action}`
    );

    try {
      const isDataUpdated = async (): Promise<boolean> => {
        logger.log("Polling: refetching all hive data...");
        const { data: newData } = await refetchAllHiveData({
          fetchPolicy: "network-only",
        });
        if (!newData) {
          logger.warn("Polling: newData is undefined.");
          return false;
        }

        const newEdges = newData.stakedNFTs.edges;
        if (affectedBeeId !== undefined && action) {
          const existsInNewData = newEdges.some(
            (edge) => Number(edge.node.tokenIdNum) === affectedBeeId
          );

          if (action === "stake") {
            return existsInNewData;
          } else if (action === "unstake") {
            return !existsInNewData;
          }
        }

        const previousCount = state.stakedNFTs.length;
        const newCount = newEdges.length;
        return newCount !== previousCount;
      };

      const pollingResult = await pollUntilCondition(isDataUpdated, 1000, 30);
      logger.log("Polling completed:", pollingResult);

      // Small delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { data: finalData } = await refetchAllHiveData({
        fetchPolicy: "network-only",
      });
      if (finalData) {
        const updatedStakedNFTs = finalData.stakedNFTs.edges.map(
          (edge) => edge.node
        );
        dispatch({ type: "SET_STAKED_NFTS", payload: updatedStakedNFTs });
      }

      logger.log("Hive data refresh complete.");
    } catch (err) {
      logger.error("Error during hive data refresh:", err);
    } finally {
      dispatch({ type: "SET_IS_REFRESHING", payload: false });
    }
  };

  // ------------------------------------------------------------------------
  // 10) Gather final context value
  // ------------------------------------------------------------------------
  const contextValue = useMemo(
    () => ({
      environments: state.environments,
      hivesMap: state.hivesMap,
      resources: state.resources,
      stakedNFTs: state.stakedNFTs,
      maxBeesMap: state.maxBeesMap,
      getHiveById,
      getStakedNFTsByHiveId,
      getMaxBeesByHiveId,
      loading: loading || maxBeesLoading || productionLoading,
      error: error || null,
      refreshHiveData,
      filteredStakedNFTs,
      isRefreshing: state.isRefreshing,
    }),
    [
      state.environments,
      state.hivesMap,
      state.resources,
      state.stakedNFTs,
      state.maxBeesMap,
      loading,
      maxBeesLoading,
      productionLoading,
      error,
      filteredStakedNFTs,
      refreshHiveData,
      getHiveById,
      getStakedNFTsByHiveId,
      getMaxBeesByHiveId,
    ]
  );

  return (
    <HivesContext.Provider value={contextValue}>
      {children}
    </HivesContext.Provider>
  );
};
