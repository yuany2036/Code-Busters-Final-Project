import { useReducer, createContext, useState, useEffect } from 'react';
import { usersInitialState, usersReducer } from '../data/reducers/usersreducer';
import { getUser } from '../apiCalls/userApiCalls';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // User State
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  useEffect(() => {
    getUser(usersDispatch);
  }, []);

  const { user, isUserLoggedIn } = usersState;

  const updateUserPreferences = (preferences) => {
    usersDispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  return (
    <DataContext.Provider
      value={{
        user,
        isUserLoggedIn,
        usersDispatch,
        error,
        loading,
        setError,
        setLoading,
        updateUserPreferences, // Add this line to provide the method
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
