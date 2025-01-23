// src/context/HivesContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
  useMemo,
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
import { pollUntilCondition } from "@/app/utils/polling";
import { logger } from "@/app/utils/logger";
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

  // Use fetchPolicy: 'network-only' to always fetch fresh data
  const {
    data,
    loading,
    error,
    refetch: refetchAllHiveData,
  } = useQuery<StakedNFTsData>(GET_ALL_HIVE_DATA, {
    fetchPolicy: "network-only",
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

  useEffect(() => {
    if (data) {
      const stakedNFTsData = data.stakedNFTs.edges.map((edge) => edge.node);
      dispatch({ type: "SET_STAKED_NFTS", payload: stakedNFTsData });
      logger.log("Staked NFTs data set:", stakedNFTsData);
    }
  }, [data, loading, error]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
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

        if (!maxBeesLoading && maxBeesData) {
          const maxBees = Number(maxBeesData);
          if (!isNaN(maxBees)) {
            const newMaxBeesMap = new Map<number, number>();
            newHivesMap.forEach((_, hiveId) => {
              newMaxBeesMap.set(hiveId, maxBees);
              logger.log(`Max bees set for hive ID ${hiveId}: ${maxBees}`);
            });
            dispatch({ type: "SET_MAX_BEES_MAP", payload: newMaxBeesMap });
            logger.log("MaxBeesMap updated:", newMaxBeesMap);
          } else {
            logger.error("Invalid maxBees value:", maxBeesData);
          }
        }

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

  const getHiveById = (hiveId: number): HiveHatchling | undefined => {
    const hive = state.hivesMap.get(hiveId);
    return hive;
  };

  const getStakedNFTsByHiveId = (hiveId: number): StakedNFT[] => {
    const filteredNFTs = state.stakedNFTs.filter(
      (nft) => Number(nft.hiveId.hiveId) === hiveId
    );
    logger.log(
      `getStakedNFTsByHiveId called for hive ID ${hiveId}:`,
      filteredNFTs
    );
    return filteredNFTs;
  };

  const getMaxBeesByHiveId = (hiveId: number): number | undefined => {
    const maxBees = state.maxBeesMap.get(hiveId);
    return maxBees;
  };

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
        logger.log("Polling: received newData:", newData);
        if (!newData) {
          logger.warn("Polling: newData is undefined.");
          return false;
        }

        if (affectedBeeId !== undefined && action) {
          const existsInNewData = newData.stakedNFTs.edges.some(
            (edge) => Number(edge.node.tokenIdNum) === affectedBeeId
          );
          logger.log(
            `Polling: Bee ID ${affectedBeeId} exists in newData: ${existsInNewData}`
          );

          if (action === "stake") {
            logger.log(
              `Condition for 'stake' - existsInNewData: ${existsInNewData}`
            );
            return existsInNewData;
          } else if (action === "unstake") {
            logger.log(
              `Condition for 'unstake' - !existsInNewData: ${!existsInNewData}`
            );
            return !existsInNewData;
          }
        }

        const previousCount = state.stakedNFTs.length;
        const newCount = newData.stakedNFTs.edges.length;
        const countChanged = newCount !== previousCount;

        logger.log(
          `Polling Check - Previous Count: ${previousCount}, New Count: ${newCount}, Changed: ${countChanged}`
        );

        return countChanged;
      };

      const pollingResult = await pollUntilCondition(isDataUpdated, 500, 10);
      logger.log("Polling completed: Condition met:", pollingResult);

      // Small delay to ensure indexing catches up
      await new Promise((resolve) => setTimeout(resolve, 500));
      logger.log("Added delay after polling.");

      const { data: finalData } = await refetchAllHiveData({
        fetchPolicy: "network-only",
      });
      logger.log("Final refetch of all hive data:", finalData);
      if (finalData) {
        const updatedStakedNFTs = finalData.stakedNFTs.edges.map(
          (edge) => edge.node
        );
        dispatch({ type: "SET_STAKED_NFTS", payload: updatedStakedNFTs });
        logger.log(
          "StakedNFTs updated after final refetch:",
          updatedStakedNFTs
        );
      }

      const { data: productionDataFinal } = await refetchProductionData();
      logger.log("Production data refetched.");
      // Assuming productionDataFinal is processed similarly
      // ...

      logger.log("Hive data refresh complete.");
    } catch (err) {
      logger.error("Error during hive data refresh:", err);
    } finally {
      dispatch({ type: "SET_IS_REFRESHING", payload: false });
      logger.log("isRefreshing set to false.");
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
    [state, loading, maxBeesLoading, productionLoading, error, refreshHiveData]
  );

  return (
    <HivesContext.Provider value={contextValue}>
      {children}
    </HivesContext.Provider>
  );
};
