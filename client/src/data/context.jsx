import { useReducer, createContext, useState, useEffect } from 'react';
import { usersInitialState, usersReducer } from '../data/reducers/usersreducer';
import {
  moviesInitialState,
  moviesReducer,
} from '../data/reducers/moviesreducer';
import { getUser } from '../apiCalls/userApiCalls';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendURL =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'production'
      ? 'https://entscape-backend.onrender.com'
      : 'http://localhost:4000';

  const heartButtonNotification = (title, action) =>
    toast.success(`${title} has been ${action} your collection!`);

  // User State
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  useEffect(() => {
    getUser(usersDispatch);
  }, []);

  // Movies State
  const [moviesState, moviesDispatch] = useReducer(
    moviesReducer,
    moviesInitialState
  );

  const { user, isUserLoggedIn } = usersState;

  const updateUserPreferences = (preferences) => {
    usersDispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  return (
    <DataContext.Provider
      value={{
        user,
        backendURL,
        isUserLoggedIn,
        usersDispatch,
        error,
        loading,
        setError,
        setLoading,
        updateUserPreferences,
        moviesState,
        moviesDispatch,
        heartButtonNotification,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
