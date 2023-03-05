import React, { createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  return <DataContext.Provider>{children}</DataContext.Provider>;
};
