// src/context/EnvironmentContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  EnvironmentsData,
  Environment,
  SpecificEnvironmentData,
  Hive,
} from "@/types/Environment";

interface EnvironmentContextProps {
  environments: Environment[];
  hivesMap: Map<number, Map<number, Hive>>; // Map<environmentId, Map<hiveId, Hive>>
  getEnvironmentById: (id: number) => Environment | undefined;
  getHiveById: (environmentId: number, hiveId: number) => Hive | undefined;
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "useEnvironment must be used within an EnvironmentProvider"
    );
  }
  return context;
};

interface EnvironmentProviderProps {
  children: ReactNode;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({
  children,
}) => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [hivesMap, setHivesMap] = useState<Map<number, Map<number, Hive>>>(
    new Map()
  );

  // Fetch environments.json
  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const response = await fetch("/Data/environment.json"); // Corrected path
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: EnvironmentsData = await response.json();
        setEnvironments(data.environments);
        console.log("Environments fetched:", data.environments);
      } catch (error) {
        console.error("Failed to fetch environments data:", error);
      }
    };

    fetchEnvironments();
  }, []);

  // Fetch specific environment data and populate hivesMap
  useEffect(() => {
    const fetchSpecificEnvironments = async () => {
      const newHivesMap = new Map<number, Map<number, Hive>>();

      await Promise.all(
        environments.map(async (env) => {
          try {
            const response = await fetch(env.jsonUrl); // Corrected path
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: SpecificEnvironmentData = await response.json();

            data.environment.resources.forEach((resource) => {
              if (resource.type === "Hive") {
                const hive = resource as Hive;

                // Initialize the nested Map if it doesn't exist
                if (!newHivesMap.has(env.id)) {
                  newHivesMap.set(env.id, new Map());
                }

                // Add the hive to the nested Map using hiveId
                newHivesMap.get(env.id)!.set(hive.hiveId, hive);
                console.log(
                  `Added Hive: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
                );
              }
            });
          } catch (error) {
            console.error(
              `Failed to fetch data for environment ID ${env.id}:`,
              error
            );
          }
        })
      );

      setHivesMap(newHivesMap);
      console.log("HivesMap populated:", newHivesMap);
    };

    if (environments.length > 0) {
      fetchSpecificEnvironments();
    }
  }, [environments]);

  // Helper functions
  const getEnvironmentById = (id: number): Environment | undefined => {
    return environments.find((env) => env.id === id);
  };

  const getHiveById = (
    environmentId: number,
    hiveId: number
  ): Hive | undefined => {
    const envHives = hivesMap.get(environmentId);
    if (envHives) {
      return envHives.get(hiveId);
    }
    return undefined;
  };

  return (
    <EnvironmentContext.Provider
      value={{
        environments,
        hivesMap,
        getEnvironmentById,
        getHiveById,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};
