const initialData = {
    students: []
};

const StudentReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_STU': {
            return {
                ...state,
                students: action.payload
            }
        }

        default:
            return state;
    }
}
export default StudentReducer;