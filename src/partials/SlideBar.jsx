import { MdOutlineQrCode } from 'react-icons/md';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { TbFileReport } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AppFooter from '../partials/Footer';
import '../styles/slidebar.css';
import { useSelector } from 'react-redux';

const menuList = [
    {
        id: 1,
        route: '/payment-code',
        label: 'Mã thanh toán',
        icon: <MdOutlineQrCode className='icon' />,
    },
    {
        id: 2,
        route: '/timekeeping-code',
        label: 'Mã chấm công',
        icon: <MdOutlineQrCode className='icon' />,
    },
    {
        id: 3,
        route: '/order/new',
        label: 'Đơn hàng mới',
        icon: <HiOutlineClipboardList className='icon' />,
    },
    {
        id: 4,
        route: '/order/delivering',
        label: 'Đơn đang giao',
        icon: <HiOutlineClipboardList className='icon' />,
    },
    {
        id: 5,
        route: '/report',
        label: 'Báo cáo cuối ngày',
        icon: <TbFileReport className='icon' />,
    },
    {
        id: 6,
        route: '/setting',
        label: 'Cài đặt',
        icon: <FiSettings className='icon' />,
    },
];

const SlideBar = () => {
    const outlet = useSelector((state) => state.outlet);
    return (
        <div className='sidenav-container'>
            <ul>
                {menuList.map((item) => (
                    <li key={item.id}>
                        <Link to={item.route}>
                            {item.icon}
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <AppFooter outlet={outlet || {}} />
        </div>
    );
};

export default SlideBar;
