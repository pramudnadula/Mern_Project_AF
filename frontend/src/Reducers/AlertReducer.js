const initialstate = {
    loading: false
};

export const AlertReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "LOADING": {
            return {
                ...state,
                loading: action.payload
            }
        }

        default:
            return state
    }
}