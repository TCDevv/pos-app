import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const initialState = loadFromLocalStorage('currentTable') || null;

const currentTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TABLE':
            saveToLocalStorage('currentTable', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default currentTableReducer;
