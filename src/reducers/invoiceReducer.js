const initialState = [];

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INVOICE':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default invoiceReducer;
