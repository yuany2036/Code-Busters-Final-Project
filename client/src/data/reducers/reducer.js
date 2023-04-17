export const reducerInitialState = {
  user: {},
  currentTitle: {},
  currentPage: {},
  isLoggedIn: false,
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_CURRENT_TITLE':
      return {
        ...state,
        currentTitle: action.payload,
      };
  }
};
