import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProduct, setTakeAwayOrder } from '../actions/orderActions';
import AppMenu from '../components/Menu';
import Receipt from '../components/Receipt';
import AppTable from '../components/Table';
import { HOMEVIEW_MENU, ORDERING } from '../utils/constants';
import { setCurrentTable } from '../actions/currentTable';
import { setOrderProcess } from '../actions/orderActions';
import { setCurrentProcess } from '../actions/processActions';

const Home = () => {
    const dispatch = useDispatch();
    const homeview = useSelector((state) => state.homeview);
    const products = useSelector((state) => state.products);
    const tables = useSelector((state) => state.tables);
    const listOrder = useSelector((state) => state.order);
    const selectedTables = useSelector((state) => state.order).map((item) => item?.table);
    const currentTable = useSelector((state) => state.currentTable);
    const [currentProductList, setCurrentProductList] = useState([]);
    const [currentOrderProcess, setCurrentOrderProcess] = useState(ORDERING);
    const defaultActiveTable = selectedTables.length && selectedTables[0].id;
    const currentProcess = useSelector((state) => state.process);

    const changeQuantity = (quantity, record, index) => {
        var newData = {
            ...record,
            quantity: quantity,
            subtotal: record.price * quantity,
        };
        currentProductList[index] = newData;
        setCurrentProductList([...currentProductList]);
        dispatch(setOrderProduct([...currentProductList], currentTable));
    };
    useEffect(() => {
        const products = listOrder.find((item) => item.table.id === currentTable)?.product || [];
        setCurrentProductList(products);
        const process = listOrder.find((item) => item.table.id === currentTable)?.process || currentProcess || ORDERING;
        dispatch(setCurrentProcess(process));
        setCurrentOrderProcess(process);
    }, [listOrder, currentTable, currentProcess, dispatch]);

    const onSelectProduct = (product) => {
        dispatch(setCurrentProcess(ORDERING));
        const { id, price } = product;
        if (!currentTable) {
            const newData = [
                {
                    ...product,
                    quantity: 1,
                    key: id,
                    discount: null,
                    subtotal: price,
                },
            ];
            dispatch(setTakeAwayOrder(newData, { id: 'HD01', name: 'HD01' }));
            dispatch(setCurrentTable('HD01'));
            dispatch(setOrderProcess(ORDERING, 'HD01'));
        } else {
            const index = currentProductList?.findIndex((item) => item.id === product.id);
            if (index !== -1) {
                currentProductList[index].quantity += 1;
                currentProductList[index].subtotal += price;
                setCurrentProductList([...currentProductList]);
                dispatch(setOrderProduct([...currentProductList], currentTable));
            } else {
                const newData = [
                    ...currentProductList,
                    {
                        ...product,
                        quantity: 1,
                        key: id,
                        discount: null,
                        subtotal: price,
                    },
                ];
                setCurrentProductList(newData);
                dispatch(setOrderProduct(newData, currentTable));
            }
            dispatch(setOrderProcess(ORDERING, currentTable));
        }
    };

    const removeProduct = (productId) => {
        const index = currentProductList?.findIndex((item) => item.id === productId);
        if (index !== -1) {
            currentProductList.splice(index, 1);
        }
        setCurrentProductList([...currentProductList]);
        dispatch(setOrderProduct([...currentProductList], currentTable));
    };

    return (
        <>
            <Row justify='space-between' gutter={[0, 10]}>
                <Col md={14} xs={24}>
                    {homeview === HOMEVIEW_MENU ? (
                        <AppMenu products={products} onSelectProduct={onSelectProduct} />
                    ) : (
                        <AppTable tables={tables} selectedTables={selectedTables} />
                    )}
                </Col>
                <Col className='container' md={9} xs={24}>
                    {selectedTables.length ? (
                        <Receipt
                            currentOrderProcess={currentOrderProcess}
                            currentTable={currentTable}
                            selectedTables={selectedTables}
                            currentProductList={currentProductList}
                            removeProduct={removeProduct}
                            changeQuantity={changeQuantity}
                            defaultActiveTable={defaultActiveTable}
                        />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </>
    );
};

export default Home;
