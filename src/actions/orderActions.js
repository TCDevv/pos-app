export const setOrderTable = (table) => ({
    type: 'SET_ORDER_TABLE',
    payload: table,
});

export const removeOrderTable = (table) => ({
    type: 'REMOVE_ORDER_TABLE',
    payload: table,
});

export const removeOrderTableById = (tableId) => ({
    type: 'REMOVE_ORDER_TABLE_BY_ID',
    payload: tableId,
});

export const setOrderProduct = (products, tableId) => ({
    type: 'SET_ORDER_PRODUCT',
    payload: { products, tableId },
});

export const setTakeAwayOrder = (products, table) => ({
    type: 'SET_TAKE_AWAY_ORDER',
    payload: { products, table },
});

export const setOrderProcess = (process, tableId) => ({
    type: 'SET_ORDER_PROCESS',
    payload: { process, tableId },
});
