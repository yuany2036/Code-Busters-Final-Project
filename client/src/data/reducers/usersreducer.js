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
                user: {
                  ...state.user,
                  bookLover: action.payload.bookLover,
                  movieWatcher: action.payload.movieWatcher,
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

        default:
            return state;
    }
};
