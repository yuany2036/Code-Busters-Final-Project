export const usersInitialState = {
  user: {
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
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          username: action.payload.username,
          email: action.payload.email,
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
        user: action.payload,
      };

    case 'DELETE_USER':
      return usersInitialState;

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        user: {
          ...state.user,
          bookLover: action.payload.preferences,
          movieWatcher: action.payload.preferences,
        },
      };

    default:
      return state;
  }
};
