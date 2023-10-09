import { Tabs } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTable } from '../actions/currentTable';
import '../styles/receipt.css';
import TableProduct from './TableProduct';
import { ORDERING } from '../utils/constants';
import Payment from './Payment';
import { removeOrderTableById } from '../actions/orderActions';
import { BsArrowUpCircleFill } from 'react-icons/bs';

const Receipt = React.memo(
    ({
        defaultActiveTable,
        currentTable,
        selectedTables,
        currentProductList,
        removeProduct,
        currentOrderProcess,
        changeQuantity,
    }) => {
        const dispatch = useDispatch();
        const onTabChanged = (tableId) => {
            dispatch(setCurrentTable(tableId));
        };
        const handleRemoveTable = useCallback(() => {
            const newSelectedTables = selectedTables.filter((item) => item?.id !== currentTable);
            dispatch(removeOrderTableById(currentTable));
            if (newSelectedTables.length) dispatch(setCurrentTable(newSelectedTables[0]?.id));
            else dispatch(setCurrentTable(null));
        }, [dispatch, selectedTables, currentTable]);
        const moveToTop = () => {
            const element = document.getElementById('header');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const items = useMemo(() => {
            return selectedTables.map((item) => ({
                key: item.id,
                label: item.name,
                children:
                    currentOrderProcess === ORDERING ? (
                        <TableProduct
                            handleRemoveTable={handleRemoveTable}
                            changeQuantity={changeQuantity}
                            currentTable={currentTable}
                            data={currentProductList}
                            removeProduct={removeProduct}
                        />
                    ) : (
                        <Payment
                            handleRemoveTable={handleRemoveTable}
                            currentTable={currentTable}
                            currentProductList={currentProductList}
                            selectedTables={selectedTables}
                        />
                    ),
            }));
        }, [
            selectedTables,
            currentProductList,
            removeProduct,
            currentOrderProcess,
            currentTable,
            changeQuantity,
            handleRemoveTable,
        ]);

        return (
            <div id='receipt-container' className='receipt-container'>
                <Tabs
                    activeKey={currentTable}
                    items={items}
                    defaultActiveKey={defaultActiveTable}
                    onChange={onTabChanged}
                />
                <div className='scroll-up' onClick={moveToTop}>
                    <BsArrowUpCircleFill
                        fontSize={30}
                        filter='drop-shadow(1px 2px 2px rgb(103, 58, 183))'
                        color='rgb(103, 58, 183)'
                    />
                </div>
            </div>
        );
    }
);

export default Receipt;
