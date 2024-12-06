// src/context/HivesContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_HIVE_DATA } from "@/subquery/getAllHiveData"; // Ensure this query fetches stakedNFTs
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
import { useReadContracts } from "wagmi"; // Correct hook import
import HiveStakingAbiJson from "@/app/libs/abi/HiveStaking.json";
import { Abi } from "abitype";

interface HivesContextProps {
  environments: Environment[];
  hivesMap: Map<number, HiveHatchling>;
  resources: Resource[]; // New state for non-Hive resources
  stakedNFTs: StakedNFT[];
  maxBeesMap: Map<number, number>;
  getHiveById: (hiveId: number) => HiveHatchling | undefined;
  getStakedNFTsByHiveId: (hiveId: number) => StakedNFT[];
  getMaxBeesByHiveId: (hiveId: number) => number | undefined;
  loading: boolean;
  error: Error | null;
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
    throw new Error("useHives must be used within an HivesProvider");
  }
  return context;
};

interface HivesProviderProps {
  children: ReactNode;
}

export const HivesProvider: React.FC<HivesProviderProps> = ({ children }) => {
  const [hivesMap, setHivesMap] = useState<Map<number, HiveHatchling>>(
    new Map()
  );
  const [resources, setResources] = useState<Resource[]>([]); // New state
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([]);
  const [maxBeesMap, setMaxBeesMap] = useState<Map<number, number>>(new Map());
  const [totalHives, setTotalHives] = useState<number>(0);
  const router = useRouter();

  // Execute the GetAllHiveData query (assumed to fetch stakedNFTs)
  const { data, loading, error } = useQuery<StakedNFTsData>(GET_ALL_HIVE_DATA);

  // Execute the useReadHiveStakingMaxBeesPerHive hook
  const {
    data: maxBeesData,
    isLoading: maxBeesLoading,
    error: maxBeesError,
  } = useReadHiveStakingMaxBeesPerHive();

  // Set up the contracts array for useContractReads
  const contracts = useMemo(() => {
    const hiveIds = Array.from(hivesMap.keys());
    return hiveIds.map((hiveId) => ({
      address: HIVE_STAKING_ADDRESS, // Contract address from environment
      abi: HiveStakingABI, // Contract ABI
      functionName: "getHiveProduction", // Function to call
      args: [2, hiveId], // Arguments for the function
    }));
  }, [hivesMap, HIVE_STAKING_ADDRESS]);

  // Use the useContractReads hook to fetch production data
  const {
    data: productionData,
    isError: productionError,
    isLoading: productionLoading,
    refetch: refetchProductionData,
  } = useReadContracts({
    contracts, // The contracts array defined above
    // Optional configurations can be added here
    // For example:
    // cacheOnBlock: true,
    // watch: true,
    // cacheTime: 2000,
  });

  // Handle staked NFTs data
  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error("Error fetching staked NFTs:", error);
      return;
    }

    if (data) {
      const stakedNFTs = data.stakedNFTs.edges.map((edge) => edge.node); // Extract nodes from edges

      setStakedNFTs(stakedNFTs); // Assuming setStakedNFTs is a state setter
    }
  }, [data, loading, error]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        // Step 1: Fetch environments
        if (environments.length === 0) {
          const response = await fetch("/Data/Maps/Forest.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const fetchedData: SpecificEnvironmentData = await response.json();
          setEnvironments([fetchedData.environment]); // Wrap in array to match Environment[]
        }

        // Step 2: Update hivesMap and resources
        const newHivesMap = new Map<number, HiveHatchling>();
        const newResources: Resource[] = [];
        let hiveCount = 0;

        environments.forEach((env) => {
          env.resources.forEach((resource) => {
            if (resource.type === "Hive") {
              const hive = resource as HiveHatchling;
              newHivesMap.set(hive.hiveId, hive);
              hiveCount++;
            } else {
              const nonHiveResource = resource as Resource;
              newResources.push(nonHiveResource);
            }
          });
        });
        setTotalHives(hiveCount);
        setHivesMap(newHivesMap);
        setResources(newResources);

        // Step 3: Handle maxBeesData
        if (!maxBeesLoading && maxBeesData) {
          const maxBees = Number(maxBeesData);
          if (!isNaN(maxBees)) {
            const newMaxBeesMap = new Map<number, number>();
            newHivesMap.forEach((_, hiveId) => {
              newMaxBeesMap.set(hiveId, maxBees);
            });
            setMaxBeesMap(newMaxBeesMap);
          } else {
            console.error("Invalid maxBees value:", maxBeesData);
          }
        }

        // Step 4: Handle productionData
        if (!productionLoading && productionData && productionData.length > 0) {
          const updatedHivesMap = new Map<number, HiveHatchling>(newHivesMap);

          productionData.forEach((result, index) => {
            const hiveId = Array.from(newHivesMap.keys())[index];
            if (result && !result.error && result.result) {
              const [totalProduction, averageProduction] = result.result as [
                bigint,
                bigint
              ];
              const hive = updatedHivesMap.get(hiveId);
              if (hive) {
                updatedHivesMap.set(hiveId, {
                  ...hive,
                  productivityValue: Number(totalProduction),
                });
              }
            }
          });

          setHivesMap(updatedHivesMap);
        }
      } catch (error) {
        console.error("Error in combined data fetch:", error);
      }
    };

    fetchAndCombineData();
  }, [
    environments,
    maxBeesData,
    maxBeesLoading,
    productionData,
    productionLoading,
  ]);

  // Helper functions
  const getHiveById = (hiveId: number): HiveHatchling | undefined => {
    return hivesMap.get(hiveId);
  };

  const getStakedNFTsByHiveId = (hiveId: number): StakedNFT[] => {
    return stakedNFTs.filter((nft) => Number(nft.hiveId.hiveId) === hiveId);
  };

  const getMaxBeesByHiveId = (hiveId: number): number | undefined => {
    return maxBeesMap.get(hiveId);
  };

  return (
    <HivesContext.Provider
      value={{
        environments,
        hivesMap,
        resources, // Provide resources
        stakedNFTs,
        maxBeesMap,
        getHiveById,
        getStakedNFTsByHiveId,
        getMaxBeesByHiveId,
        loading: loading || maxBeesLoading || productionLoading,
        error: error || null,
      }}
    >
      {children}
    </HivesContext.Provider>
  );
};
