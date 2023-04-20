export const usersInitialState = {
    user: {},
    isUserLoggedIn: false,
};

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload,
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
