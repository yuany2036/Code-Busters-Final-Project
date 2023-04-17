export const reducerInitialState = {
  user: {},
  currentTitle: {},
  currentPage: {},
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'SET_CURRENT_TITLE':
      return {
        ...state,
        currentTitle: action.currentTitle,
      };
  }
};
