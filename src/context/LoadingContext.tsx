// src/context/LoadingContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type LoadingContextType = {
  isLoading: boolean;
  registerLoading: () => void;
  unregisterLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const registerLoading = useCallback(() => {
    setLoadingCount((count) => count + 1);
  }, []);

  const unregisterLoading = useCallback(() => {
    setLoadingCount((count) => count - 1);
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider
      value={{ isLoading, registerLoading, unregisterLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
