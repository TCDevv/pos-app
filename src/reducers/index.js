import cartReducer from './cartReducer';
import currentTableReducer from './currentTableReducer';
import homeViewReducer from './homeViewReducer';
import invoiceReducer from './invoiceReducer';
import orderReducer from './orderReducer';
import outletReducer from './outletReducer';
import processReducer from './processReducer';
import productReducer from './productReducer';
import tableReducer from './tableReducer';

const reducer = {
    cart: cartReducer,
    outlet: outletReducer,
    products: productReducer,
    tables: tableReducer,
    homeview: homeViewReducer,
    order: orderReducer,
    currentTable: currentTableReducer,
    process: processReducer,
    invoice: invoiceReducer,
};

export default reducer;
