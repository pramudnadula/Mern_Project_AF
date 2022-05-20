const initialData = {
    rareas: []
};

const ResearchAreaReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_AREAS': {
            return {
                ...state,
                rareas: action.payload
            }
        }

        default:
            return state;
    }
}
export default ResearchAreaReducer;