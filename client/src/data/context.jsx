import { useReducer, createContext } from 'react';
import { reducerInitialState, reducerFunc } from './reducers/reducer';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, reducerInitialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
