const initialState = {};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TABLES':
            return action.payload;
        default:
            return state;
    }
};

export default tableReducer;
