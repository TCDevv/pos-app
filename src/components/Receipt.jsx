import { Tabs } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTable } from '../actions/currentTable';
import '../styles/receipt.css';
import TableProduct from './TableProduct';
import { ORDERING } from '../utils/constants';
import Payment from './Payment';
import { removeOrderTableById } from '../actions/orderActions';

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
            <div className='receipt-container'>
                <Tabs
                    activeKey={currentTable}
                    items={items}
                    defaultActiveKey={defaultActiveTable}
                    onChange={onTabChanged}
                />
            </div>
        );
    }
);

export default Receipt;
