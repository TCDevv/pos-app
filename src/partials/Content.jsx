import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Code from '../pages/Code';
import Order from '../pages/Order';
import Report from '../pages/Report';
import { PAYMENT_CODE, TIMEKEEPING_CODE } from '../utils/constants';

const AppContent = () => {
    let element = useRoutes([
        {
            path: '/payment-code',
            element: <Code type={PAYMENT_CODE} />,
        },
        {
            path: '/timekeeping-code',
            element: <Code type={TIMEKEEPING_CODE} />,
        },
        {
            path: '/order',
            element: <Order />,
        },
        {
            path: '/report',
            element: <Report />,
        },
        {
            path: '/kimthien/pos',
            element: <Home />,
        },
        {
            path: '',
            element: <Navigate to='/kimthien/pos' />,
        },
    ]);

    return element;
};

export default AppContent;
