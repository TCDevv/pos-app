const initialState = null;

const outletReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OUTLET':
            return action.payload;
        default:
            return state;
    }
};

export default outletReducer;
