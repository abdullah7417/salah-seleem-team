import { createContext, useContext } from "react";

const LandingDataContext = createContext({});

export function LandingDataProvider({ value, children }) {
  return (
    <LandingDataContext.Provider value={value ?? {}}>
      {children}
    </LandingDataContext.Provider>
  );
}

export function useLandingData() {
  return useContext(LandingDataContext);
}
