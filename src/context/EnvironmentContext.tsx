"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation"; // For domain/path detection
import {
  EnvironmentsData,
  Environment,
  SpecificEnvironmentData,
  Hive,
} from "@/types/Environment";
import { logger } from "@/utils/logger";

// The shape of the data we provide to children
interface EnvironmentContextProps {
  environments: Environment[];
  hivesMap: Map<number, Map<number, Hive>>;
  currentEnvironment?: Environment;
  getEnvironmentById: (id: number) => Environment | undefined;
  getHiveById: (environmentId: number, hiveId: number) => Hive | undefined;
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

// Hook to easily get environment data
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

  // The environment determined by matching the current URL path
  const [currentEnvironment, setCurrentEnvironment] = useState<
    Environment | undefined
  >(undefined);

  // Next.js 13+ API to get the route path, ignoring domain
  const pathname = usePathname();

  // Helper to see if cache is still valid (default 1 hour)
  const isCacheValid = (timestamp: number, maxAge: number = 3600000) =>
    Date.now() - timestamp < maxAge;

  // Fetch our environment.json from /Data/environment.json with localStorage caching
  useEffect(() => {
    const cachedEnv = localStorage.getItem("environments");
    const cachedEnvTimestamp = localStorage.getItem("environments_timestamp");

    if (
      cachedEnv &&
      cachedEnvTimestamp &&
      isCacheValid(Number(cachedEnvTimestamp))
    ) {
      // Use cached data
      const data: EnvironmentsData = JSON.parse(cachedEnv);
      setEnvironments(data.environments);
      logger.log("Loaded environments from cache:", data.environments);
    } else {
      // Fetch fresh data
      const fetchEnvironments = async () => {
        try {
          const response = await fetch("/Data/environment.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: EnvironmentsData = await response.json();
          setEnvironments(data.environments);

          // Store in localStorage for caching
          localStorage.setItem("environments", JSON.stringify(data));
          localStorage.setItem("environments_timestamp", Date.now().toString());

          logger.log("Fetched and cached environments:", data.environments);
        } catch (error) {
          logger.error("Failed to fetch environments data:", error);
        }
      };

      fetchEnvironments();
    }
  }, []);

  // Fetch environment-specific data (resources, etc.), also with caching
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
            // Use cached environment data
            const data: SpecificEnvironmentData = JSON.parse(cachedEnv);

            if (data.environment.resources) {
              data.environment.resources.forEach((resource) => {
                if (resource.resourceType === "Hive") {
                  const hive = resource as Hive;
                  if (!newHivesMap.has(env.id)) {
                    newHivesMap.set(env.id, new Map());
                  }
                  newHivesMap.get(env.id)!.set(hive.hiveId, hive);

                  logger.log(
                    `Loaded Hive from cache: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
                  );
                }
              });
            }
          } else {
            // Fetch fresh environment-specific data
            try {
              if (!env.jsonUrl) return; // skip if no jsonUrl
              const response = await fetch(env.jsonUrl);
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data: SpecificEnvironmentData = await response.json();

              if (data.environment.resources) {
                data.environment.resources.forEach((resource) => {
                  if (resource.resourceType === "Hive") {
                    const hive = resource as Hive;
                    if (!newHivesMap.has(env.id)) {
                      newHivesMap.set(env.id, new Map());
                    }
                    newHivesMap.get(env.id)!.set(hive.hiveId, hive);
                    logger.log(
                      `Fetched and cached Hive: ${hive.name} (hiveId: ${hive.hiveId}) to Environment ID: ${env.id}`
                    );
                  }
                });
              }

              // Cache
              localStorage.setItem(cacheKey, JSON.stringify(data));
              localStorage.setItem(
                `${cacheKey}_timestamp`,
                Date.now().toString()
              );
            } catch (error) {
              logger.error(
                `Failed to fetch data for environment ID ${env.id}:`,
                error
              );
            }
          }
        })
      );

      // After all environments are fetched/cached, update state
      setHivesMap(newHivesMap);
      logger.log("HivesMap populated:", newHivesMap);
    };

    if (environments.length > 0) {
      fetchSpecificEnvironments();
    }
  }, [environments]);

  // Each time `pathname` or `environments` changes, figure out which environment is current
  useEffect(() => {
    if (!pathname || environments.length === 0) {
      logger.log("Either no pathname or environments empty", {
        pathname,
        environmentsLength: environments.length,
      });
      setCurrentEnvironment(undefined);
      return;
    }

    logger.log("Current pathname:", pathname);

    const matchedEnv = environments.find((env) => {
      logger.log(
        "Checking environment:",
        env.name,
        "with environmentURL:",
        env.environmentURL
      );

      if (!env.environmentURL) {
        logger.log(`Skipping ${env.name} because environmentURL is empty.`);
        return false;
      }

      const doesMatch = pathname.startsWith(env.environmentURL);
      logger.log(
        `Does pathname "${pathname}" start with "${env.environmentURL}"?`,
        doesMatch
      );

      return doesMatch;
    });

    if (!matchedEnv) {
      logger.log("No matching environment found for pathname:", pathname);
    } else {
      logger.log("Matched environment:", matchedEnv.name);
    }

    setCurrentEnvironment(matchedEnv);
  }, [pathname, environments]);

  logger.log("environments", environments);
  logger.log("CurrentEnvironment", currentEnvironment);
  // Utility functions
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
        currentEnvironment,
        getEnvironmentById,
        getHiveById,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};
