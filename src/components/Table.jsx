import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { removeOrderTable, setOrderProcess, setOrderTable } from '../actions/orderActions';
import TableItem from './TableItem';
import { TABLE_1, TABLE_2 } from '../utils/constants';
import React, { useMemo } from 'react';
import { setHomeView } from '../actions/homeViewActions';
import { HOMEVIEW_MENU } from '../utils/constants';
import { setCurrentTable } from '../actions/currentTable';
import { ORDERING } from '../utils/constants';
import { setCurrentProcess } from '../actions/processActions';

const AppTable = React.memo(({ tables, selectedTables }) => {
    const dispatch = useDispatch();

    const handleClick = (table) => {
        if (selectedTables.length && selectedTables.includes(table)) {
            dispatch(removeOrderTable(table));
        } else {
            dispatch(setHomeView(HOMEVIEW_MENU));
            dispatch(setOrderTable(table));
            dispatch(setCurrentTable(table.id));
            dispatch(setCurrentProcess(ORDERING));
            dispatch(setOrderProcess(ORDERING, table.id));
        }
    };

    const activeKey = useMemo(() => {
        return tables[TABLE_2].child.findIndex((item) => item === selectedTables[0]) !== -1 ? '2' : '1';
    }, [selectedTables, tables]);

    const items = [
        {
            key: '1',
            label: tables[TABLE_1].name,
            children: <TableItem tables={tables[TABLE_1]} onTableClick={handleClick} selectedTables={selectedTables} />,
        },
        {
            key: '2',
            label: tables[TABLE_2].name,
            children: <TableItem tables={tables[TABLE_2]} onTableClick={handleClick} selectedTables={selectedTables} />,
        },
    ];
    return (
        <>
            <div className='container list-table-container'>
                <Tabs defaultActiveKey={activeKey} items={items} />
            </div>
        </>
    );
});

export default AppTable;
