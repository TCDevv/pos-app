import '../styles/table.css';

const TableItem = ({ tables, onTableClick, selectedTables }) => {
    return (
        <div className='table-container'>
            {tables.child.map((item) => (
                <div
                    className='table-item'
                    key={item.id}
                    onClick={() => onTableClick(item)}
                    style={{
                        background: selectedTables.length && selectedTables.includes(item) && 'rgb(175 130 255)',
                    }}
                >
                    <div className='table-name'>{item.name}</div>
                    <img src='https://cdn-icons-png.flaticon.com/128/6404/6404680.png' alt='' />
                </div>
            ))}
        </div>
    );
};

export default TableItem;
