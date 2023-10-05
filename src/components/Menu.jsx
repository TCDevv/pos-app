import { Space } from 'antd';
import { useMemo, useState } from 'react';
import ListMenu from './ListMenu';
import SearchBar from './SearchBar';

const AppMenu = ({ products, onSelectProduct }) => {
    const [query, setQuery] = useState('');
    const productShow = useMemo(() => {
        return products.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
    }, [products, query]);
    return (
        <>
            <Space direction='vertical' style={{ width: '100%' }}>
                <SearchBar query={query} setQuery={setQuery} />
                <ListMenu products={productShow} onSelectProduct={onSelectProduct} />
            </Space>
        </>
    );
};

export default AppMenu;
