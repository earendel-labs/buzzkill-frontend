// src/context/HivesContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_HIVE_DATA } from "@/subquery/getAllHiveData"; // Ensure this query fetches stakedNFTs
import {
  Environment,
  Hive,
  Resource,
  StakedNFT,
  StakedNFTsData,
  SpecificEnvironmentData,
} from "@/types/Environment";
import { useReadHiveStakingMaxBeesPerHive } from "@/hooks/HiveStaking";
import { useRouter } from "next/navigation";

interface HivesContextProps {
  environments: Environment[];
  hivesMap: Map<number, Hive>;
  resources: Resource[]; // New state for non-Hive resources
  stakedNFTs: StakedNFT[];
  maxBeesMap: Map<number, number>;
  getHiveById: (hiveId: number) => Hive | undefined;
  getStakedNFTsByHiveId: (hiveId: number) => StakedNFT[];
  getMaxBeesByHiveId: (hiveId: number) => number | undefined;
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
  const [hivesMap, setHivesMap] = useState<Map<number, Hive>>(new Map());
  const [resources, setResources] = useState<Resource[]>([]); // New state
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([]);
  const [maxBeesMap, setMaxBeesMap] = useState<Map<number, number>>(new Map());

  const router = useRouter();

  // Execute the GetAllHiveData query (assumed to fetch stakedNFTs)
  const { data, loading, error } = useQuery<StakedNFTsData>(GET_ALL_HIVE_DATA);

  // Execute the useReadHiveStakingMaxBeesPerHive hook
  const {
    data: maxBeesData,
    isLoading: maxBeesLoading,
    error: maxBeesError,
  } = useReadHiveStakingMaxBeesPerHive();

  // Handle staked NFTs data
  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error("Error fetching staked NFTs:", error);
      return;
    }

    if (data) {
      setStakedNFTs(data.stakedNFTs.nodes);
      console.log("Staked NFTs fetched:", data.stakedNFTs.nodes);
    }
  }, [data, loading, error]);

  // Fetch environments and hives from JSON
  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const response = await fetch("/Data/Maps/Forest.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedData: SpecificEnvironmentData = await response.json();
        setEnvironments([fetchedData.environment]); // Wrap in array to match Environment[]
        console.log("Environments fetched:", [fetchedData.environment]);
      } catch (error) {
        console.error("Failed to fetch environments data:", error);
      }
    };

    fetchEnvironments();
  }, []);

  // Populate hivesMap and resources from environments
  useEffect(() => {
    if (environments.length === 0) return;

    const populateHivesAndResources = () => {
      const newHivesMap = new Map<number, Hive>();
      const newResources: Resource[] = [];

      environments.forEach((env) => {
        env.resources.forEach((resource) => {
          if (resource.type === "Hive") {
            const hive = resource as Hive;
            newHivesMap.set(hive.hiveId, hive);
            console.log(
              `Added Hive: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
            );
          } else {
            const nonHiveResource = resource as Resource;
            newResources.push(nonHiveResource);
            console.log(
              `Added Resource: ${nonHiveResource.type} (id: ${nonHiveResource.id}) to Environment ID: ${env.id}`
            );
          }
        });
      });

      setHivesMap(newHivesMap);
      setResources(newResources); // Set non-Hive resources
      console.log("HivesMap populated:", newHivesMap);
      console.log("Resources populated:", newResources);
    };

    populateHivesAndResources();
  }, [environments]);

  // Handle max bees data and map it to each hive (Reverted to original configuration)
  useEffect(() => {
    if (maxBeesLoading || hivesMap.size === 0) return;
    if (maxBeesError) {
      console.error("Error fetching max bees data:", maxBeesError);
      return;
    }

    if (maxBeesData) {
      const newMaxBeesMap = new Map<number, number>();

      // Assuming maxBeesData contains a single maxBees value applicable to all hives
      const maxBees = Number(maxBeesData);

      if (isNaN(maxBees)) {
        console.error("Invalid maxBees value:", maxBeesData);
        return;
      }

      hivesMap.forEach((hive, hiveId) => {
        newMaxBeesMap.set(hiveId, maxBees);
      });

      setMaxBeesMap(newMaxBeesMap);
      console.log(
        "MaxBeesMap populated with same maxBees for all hives:",
        newMaxBeesMap
      );
    }
  }, [maxBeesData, maxBeesLoading, maxBeesError, hivesMap]);

  // Helper functions
  const getHiveById = (hiveId: number): Hive | undefined => {
    return hivesMap.get(hiveId);
  };

  const getStakedNFTsByHiveId = (hiveId: number): StakedNFT[] => {
    return stakedNFTs.filter((nft) => Number(nft.hive.hiveId) === hiveId);
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
      }}
    >
      {children}
    </HivesContext.Provider>
  );
};
