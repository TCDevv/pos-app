import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import outletReducer from './outletReducer';
import productReducer from './productReducer';
import tableReducer from './tableReducer';
import homeViewReducer from './homeViewReducer';
import orderReducer from './orderReducer';
import currentTableReducer from './currentTableReducer';
import processReducer from './processReducer';
import invoiceReducer from './invoiceReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    outlet: outletReducer,
    products: productReducer,
    tables: tableReducer,
    homeview: homeViewReducer,
    order: orderReducer,
    currentTable: currentTableReducer,
    process: processReducer,
    invoice: invoiceReducer,
});

export default rootReducer;
