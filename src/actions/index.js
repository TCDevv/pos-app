import configData from '../config.json';
import { setOutlet } from './outletActions';
import { setProducts } from './productActions';
import { setTables } from './tableActions';

export const fetchData = () => {
    return (dispatch) => {
        const { outlet, products, tables } = configData;

        dispatch(setOutlet(outlet));
        dispatch(setProducts(products));
        dispatch(setTables(tables));
    };
};
