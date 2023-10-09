import { Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchData } from '../actions';
import AppContent from '../partials/Content';
import AppHeader from '../partials/Header';

const { Header, Content } = Layout;

const headerStyle = {
    background: '#673ab7',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
};
const contentStyle = {
    minHeight: 'calc(100vh - 64px)',
    background: '#673ab7',
    padding: '10px 30px',
};

const App = () => {
    const outlet = useSelector((state) => state.outlet);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div>
            <Router>
                <Layout>
                    <Header id='header' style={headerStyle}>
                        <AppHeader outlet={outlet} />
                    </Header>
                    <Content style={contentStyle}>
                        <AppContent />
                    </Content>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
