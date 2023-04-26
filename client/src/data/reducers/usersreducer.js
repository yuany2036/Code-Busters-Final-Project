export const usersInitialState = {
    user: {
        bookLover: false,
        movieWatcher: false,
        none:true,
    },
    isUserLoggedIn: false,

};

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
              user: {
                ...state.user,
                bookLover: action.payload.preferences === 'bookLover',
                movieWatcher: action.payload.preferences === 'movieWatcher',
                none: action.payload.preferences === 'none',
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
                bookLover: action.payload.preferences === 'bookLover',
                movieWatcher: action.payload.preferences === 'movieWatcher',
                none: action.payload.preferences === 'none',
              },
            };
  
      default:
        return state;
    }
  };
  
