import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTable } from '../actions/currentTable';
import '../styles/receipt.css';
import TableProduct from './TableProduct';
import { ORDERING } from '../utils/constants';
import Payment from './Payment';

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

        const items = useMemo(() => {
            return selectedTables.map((item) => ({
                key: item.id,
                label: item.name,
                children:
                    currentOrderProcess === ORDERING ? (
                        <TableProduct
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
        }, [selectedTables, currentProductList, removeProduct, currentOrderProcess, currentTable, changeQuantity]);

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
