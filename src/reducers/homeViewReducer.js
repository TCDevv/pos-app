import { HOMEVIEW_MENU } from '../utils/constants';

const initialState = HOMEVIEW_MENU;

const homeViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HOME_VIEW':
            return action.payload;
        default:
            return state;
    }
};

export default homeViewReducer;
