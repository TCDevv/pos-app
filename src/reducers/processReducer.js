import { ORDERING } from '../utils/constants';

const initialState = ORDERING;

const processReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PROCESS':
            return action.payload;
        default:
            return state;
    }
};

export default processReducer;
