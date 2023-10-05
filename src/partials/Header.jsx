import { Drawer } from 'antd';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHomeView } from '../actions/homeViewActions';
import { setOrderTable } from '../actions/orderActions';
import '../styles/header.css';
import { HOMEVIEW_MENU, HOMEVIEW_TABLE } from '../utils/constants';
import SlideBar from './SlideBar';

const AppHeader = ({ outlet }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const showDrawer = () => {
        setOpen(true);
    };
    const closeDrawer = () => {
        setOpen(false);
    };
    const scrollToReceipt = () => {
        const element = document.getElementById('receipt-container');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <MdMenu className='menu-icon' onClick={showDrawer} />

            <Link
                className='link-header'
                to='/'
                onClick={() => {
                    dispatch(setHomeView(HOMEVIEW_TABLE));
                }}
            >
                <img src='https://cdn-icons-png.flaticon.com/128/6404/6404680.png' height={35} alt='' />
            </Link>
            <Link
                className='link-header'
                to='/'
                onClick={() => {
                    dispatch(setHomeView(HOMEVIEW_MENU));
                }}
            >
                <img src='https://cdn-icons-png.flaticon.com/128/2674/2674505.png' height={35} alt='' />
            </Link>
            <Link className='link-header receipt-menu' onClick={scrollToReceipt}>
                <img src='https://cdn-icons-png.flaticon.com/128/9640/9640038.png' height={35} alt='' />
            </Link>
            <Drawer title={outlet?.name} placement='left' closable={true} onClose={closeDrawer} open={open}>
                <SlideBar />
            </Drawer>
            <Link to='/' className='receipt' onClick={() => dispatch(setOrderTable())}>
                <AiFillPlusCircle className='plus-icon' />
                Hóa đơn
            </Link>
        </>
    );
};

export default AppHeader;
