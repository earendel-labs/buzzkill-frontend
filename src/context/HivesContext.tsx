// src/context/HivesContext.tsx

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

interface HivesState {
  environments: Environment[];
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

const HiveStakingABI = HiveStakingAbiJson as Abi;

const HIVE_STAKING_ADDRESS =
  (process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS as `0x${string}`) ||
  ("" as `0x${string}`);

if (!HIVE_STAKING_ADDRESS) {
  throw new Error(
    "NEXT_PUBLIC_HIVE_STAKING_ADDRESS is not defined in the environment variables."
  );
}

const HivesContext = createContext<HivesContextProps | undefined>(undefined);

export const useHives = (): HivesContextProps => {
  const context = useContext(HivesContext);
  if (!context) {
    throw new Error("useHives must be used within a HivesProvider");
  }
  return context;
};

interface HivesProviderProps {
  children: ReactNode;
}

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

export const HivesProvider: React.FC<HivesProviderProps> = ({ children }) => {
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

  // Apollo query with pagination
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

  const {
    data: maxBeesData,
    isLoading: maxBeesLoading,
    error: maxBeesError,
  } = useReadHiveStakingMaxBeesPerHive();

  const contracts = useMemo(() => {
    const hiveIds = Array.from(state.hivesMap.keys());
    logger.log("Preparing contracts for hives:", hiveIds);
    return hiveIds.map((hiveId) => ({
      address: HIVE_STAKING_ADDRESS,
      abi: HiveStakingABI,
      functionName: "getHiveProduction",
      args: [2, hiveId],
    }));
  }, [state.hivesMap]);

  const {
    data: productionData,
    isError: productionError,
    isLoading: productionLoading,
    refetch: refetchProductionData,
  } = useReadContracts({ contracts });

  // Function to gather all pages of staked NFTs
  const fetchAllEdges = async (
    cursor: string | null,
    existingEdges: StakedNFT[]
  ): Promise<void> => {
    try {
      const { data: newData } = await fetchMore({
        variables: { after: cursor },
      });
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

  // Load all staked NFTs when initial data arrives
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

  // Store allStakedNFTs in our reducer once loaded
  useEffect(() => {
    if (allStakedNFTs.length > 0) {
      dispatch({ type: "SET_STAKED_NFTS", payload: allStakedNFTs });
      logger.log("All staked NFTs data set:", allStakedNFTs);
    }
  }, [allStakedNFTs]);

  // Load environment data, maxBees, production, etc.
  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        // Load environment data if not yet loaded
        if (state.environments.length === 0) {
          const response = await fetch("/Data/Maps/Forest.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const fetchedData: SpecificEnvironmentData = await response.json();
          dispatch({
            type: "SET_ENVIRONMENTS",
            payload: [fetchedData.environment],
          });
        }

        const newHivesMap = new Map<number, HiveHatchling>();
        const newResources: Resource[] = [];
        let hiveCount = 0;

        state.environments.forEach((env) => {
          env.resources.forEach((resource) => {
            if (resource.type === "Hive") {
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
            logger.error("Invalid maxBees value:", maxBeesData);
          }
        }

        // Update each hive's productivityValue
        if (!productionLoading && productionData && productionData.length > 0) {
          const updatedHivesMap = new Map<number, HiveHatchling>(newHivesMap);

          productionData.forEach((result, index) => {
            const hiveId = Array.from(newHivesMap.keys())[index];
            if (result && !result.error && result.result) {
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

  const getStakedNFTsByHiveId = useCallback(
    (hiveId: number): StakedNFT[] => {
      return state.stakedNFTs.filter(
        (nft) => Number(nft.hiveId.hiveId) === hiveId
      );
    },
    [state.stakedNFTs]
  );

  const getHiveById = (hiveId: number): HiveHatchling | undefined => {
    return state.hivesMap.get(hiveId);
  };

  const getMaxBeesByHiveId = (hiveId: number): number | undefined => {
    return state.maxBeesMap.get(hiveId);
  };

  // Refresh data and poll until subquery is updated
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
