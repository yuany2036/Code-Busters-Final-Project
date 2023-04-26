export const usersInitialState = {
  user: {
    bookLover: false,
    movieWatcher: false,
  },
  isUserLoggedIn: false,
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          bookLover: action.payload.preferences === 'bookLover',
          movieWatcher: action.payload.preferences === 'movieWatcher',
        },
        isUserLoggedIn: true,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
      };

    case 'LOGOUT':
      return usersInitialState;

    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          bookLover: action.payload.preferences.bookLover,
          movieWatcher: action.payload.preferences.movieWatcher,
        },
      };

    case 'UPDATE_PREFERENCES': // Add this case to handle preferences update
      return {
        ...state,
        user: {
          ...state.user,
          bookLover: action.payload.preferences === 'bookLover',
          movieWatcher: action.payload.preferences === 'movieWatcher',
        },
      };

    default:
      return state;
  }
};

  
