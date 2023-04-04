import { useReducer, createContext } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const message = "whats up";

  return (
    <DataContext.Provider value={{ message }}>{children}</DataContext.Provider>
  );
};

export default DataContext;
