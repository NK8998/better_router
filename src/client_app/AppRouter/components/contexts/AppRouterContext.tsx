import { createContext, ReactNode, useContext, useState } from "react";
import { AppRouterContextProps } from "../types";
import { useLocationInitiator } from "../hooks";

const AppRouterContext = createContext<AppRouterContextProps | null>(null);

export const AppRouterProvider = ({
  children,
  persist = false,
}: {
  children: ReactNode;
  persist?: boolean;
}) => {
  const { location, setLocation, transitioning, setIsIsTransitioning } =
    useLocationInitiator();

  const value: AppRouterContextProps = {
    location,
    setLocation,
    transitioning,
    setIsIsTransitioning,

    persist,
  };

  return (
    <AppRouterContext.Provider value={value}>
      {children}
    </AppRouterContext.Provider>
  );
};

export const useAppRouterContext = () => {
  const ctx = useContext(AppRouterContext);

  if (!ctx) {
    throw new Error(
      "useAppRouterContext must be used within a AppRouterProvider"
    );
  }

  return ctx;
};
