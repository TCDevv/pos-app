import { ORDERING } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const initialState = loadFromLocalStorage('currentOrder') || [];

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDER_TABLE':
            if (action.payload) {
                saveToLocalStorage('currentOrder', [
                    {
                        table: action.payload,
                        product: [],
                        process: ORDERING,
                    },
                    ...state,
                ]);
                return [
                    {
                        table: action.payload,
                        product: [],
                        process: ORDERING,
                    },
                    ...state,
                ];
            } else {
                const length = state.length + 1;
                const name = `HD${length < 10 ? '0' + length : length}`;
                const index = state.findIndex((item) => item.table.id === name);
                if (index === -1) {
                    saveToLocalStorage('currentOrder', [
                        {
                            table: {
                                id: name,
                                name: name,
                            },
                            product: [],
                            process: ORDERING,
                        },
                        ...state,
                    ]);
                    return [
                        {
                            table: {
                                id: name,
                                name: name,
                            },
                            product: [],
                            process: ORDERING,
                        },
                        ...state,
                    ];
                } else return state;
            }
        case 'REMOVE_ORDER_TABLE':
            saveToLocalStorage(
                'currentOrder',
                state.filter((item) => item.table !== action.payload)
            );
            return state.filter((item) => item.table !== action.payload);
        case 'REMOVE_ORDER_TABLE_BY_ID':
            saveToLocalStorage('currentOrder', state.filter((item) => item.table.id !== action.payload) || []);
            return state.filter((item) => item.table.id !== action.payload) || [];
        case 'SET_ORDER_PRODUCT':
            state.find((item) => item.table.id === action.payload.tableId).product = action.payload.products;
            saveToLocalStorage('currentOrder', state);
            return state;
        case 'SET_TAKE_AWAY_ORDER':
            saveToLocalStorage('currentOrder', [
                ...state,
                {
                    table: action.payload.table,
                    product: action.payload.products,
                },
            ]);
            return [
                ...state,
                {
                    table: action.payload.table,
                    product: action.payload.products,
                },
            ];
        case 'SET_ORDER_PROCESS':
            state.find((item) => item.table.id === action.payload.tableId).process = action.payload.process;
            saveToLocalStorage('currentOrder', state);
            return state;
        default:
            return state;
    }
};

export default orderReducer;
