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
  hivesMap: Map<number, Map<number, Hive>>;
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

  // Helper function to check if cached data is valid
  const isCacheValid = (timestamp: number, maxAge: number = 3600000) => {
    // default 1 hour
    return Date.now() - timestamp < maxAge;
  };

  // Fetch environments.json with caching
  useEffect(() => {
    const cachedEnv = localStorage.getItem("environments");
    const cachedEnvTimestamp = localStorage.getItem("environments_timestamp");
    if (
      cachedEnv &&
      cachedEnvTimestamp &&
      isCacheValid(Number(cachedEnvTimestamp))
    ) {
      const data: EnvironmentsData = JSON.parse(cachedEnv);
      setEnvironments(data.environments);
      console.log("Loaded environments from cache:", data.environments);
    } else {
      const fetchEnvironments = async () => {
        try {
          const response = await fetch("/Data/environment.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: EnvironmentsData = await response.json();
          setEnvironments(data.environments);
          localStorage.setItem("environments", JSON.stringify(data));
          localStorage.setItem("environments_timestamp", Date.now().toString());
          console.log("Fetched and cached environments:", data.environments);
        } catch (error) {
          console.error("Failed to fetch environments data:", error);
        }
      };
      fetchEnvironments();
    }
  }, []);

  // Fetch specific environment data with caching
  useEffect(() => {
    const fetchSpecificEnvironments = async () => {
      const newHivesMap = new Map<number, Map<number, Hive>>();

      await Promise.all(
        environments.map(async (env) => {
          const cacheKey = `environment_${env.id}`;
          const cachedEnv = localStorage.getItem(cacheKey);
          const cachedEnvTimestamp = localStorage.getItem(
            `${cacheKey}_timestamp`
          );
          if (
            cachedEnv &&
            cachedEnvTimestamp &&
            isCacheValid(Number(cachedEnvTimestamp))
          ) {
            const data: SpecificEnvironmentData = JSON.parse(cachedEnv);
            data.environment.resources.forEach((resource) => {
              if (resource.type === "Hive") {
                const hive = resource as Hive;
                if (!newHivesMap.has(env.id)) {
                  newHivesMap.set(env.id, new Map());
                }
                newHivesMap.get(env.id)!.set(hive.hiveId, hive);
                console.log(
                  `Loaded Hive from cache: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
                );
              }
            });
          } else {
            try {
              const response = await fetch(env.jsonUrl);
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data: SpecificEnvironmentData = await response.json();

              data.environment.resources.forEach((resource) => {
                if (resource.type === "Hive") {
                  const hive = resource as Hive;

                  if (!newHivesMap.has(env.id)) {
                    newHivesMap.set(env.id, new Map());
                  }

                  newHivesMap.get(env.id)!.set(hive.hiveId, hive);
                  console.log(
                    `Fetched and cached Hive: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
                  );
                }
              });

              localStorage.setItem(cacheKey, JSON.stringify(data));
              localStorage.setItem(
                `${cacheKey}_timestamp`,
                Date.now().toString()
              );
            } catch (error) {
              console.error(
                `Failed to fetch data for environment ID ${env.id}:`,
                error
              );
            }
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
