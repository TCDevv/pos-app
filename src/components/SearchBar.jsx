import '../styles/searchBar.css';
import { Input, Button } from 'antd';
import { IoMdBarcode } from 'react-icons/io';

const SearchBar = ({ query, setQuery }) => {
    return (
        <div className='container search-bar-container'>
            <Button
                className='primary-btn'
                style={{ height: 50, width: 80, fontSize: 20 }}
                type='primary'
                icon={<IoMdBarcode />}
            />
            <Input
                style={{ height: 50 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Tìm kiếm: sản phẩm, barcode'
            />
        </div>
    );
};

export default SearchBar;
