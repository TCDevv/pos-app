import { Tabs } from 'antd';
import '../styles/listMenu.css';
import { DESERT_CATEGORY, DRINK_CATEGORY } from '../utils/constants';
import { convertPrice } from '../utils/util';

const ListMenu = ({ products, onSelectProduct }) => {
    const items = [
        {
            key: '1',
            label: 'Tráng miệng',
            children: (
                <div className='category-container'>
                    {products.map(
                        (item) =>
                            item.category === DESERT_CATEGORY && (
                                <div className='product-container' key={item.id} onClick={() => onSelectProduct(item)}>
                                    <img src={item.image} alt='' />
                                    {item.title}
                                    <span>{convertPrice(item.price)}</span>
                                </div>
                            )
                    )}
                </div>
            ),
        },
        {
            key: '2',
            label: 'Nước uống',
            children: (
                <div className='category-container'>
                    {products.map(
                        (item) =>
                            item.category === DRINK_CATEGORY && (
                                <div className='product-container' key={item.id} onClick={() => onSelectProduct(item)}>
                                    <img src={item.image} alt='' />
                                    {item.title}
                                    <span>{convertPrice(item.price)}</span>
                                </div>
                            )
                    )}
                </div>
            ),
        },
    ];
    return (
        <div className='container list-menu-container'>
            <Tabs defaultActiveKey='1' items={items} />
        </div>
    );
};

export default ListMenu;
