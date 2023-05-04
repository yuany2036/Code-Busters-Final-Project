export const moviesInitialState = {
  movies: [],
};

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'UPDATE_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'DELETE_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};
