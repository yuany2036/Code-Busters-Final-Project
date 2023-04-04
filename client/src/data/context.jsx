import { useReducer, createContext } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const firstName = "yuan";

  return (
    <DataContext.Provider value={{ firstName }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
