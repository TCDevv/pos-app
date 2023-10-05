import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import AppHeader from '../partials/Header';
import AppFooter from '../partials/Footer';
import AppContent from '../partials/Content';
import { fetchData } from '../actions';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

const headerStyle = {
    background: '#673ab7',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
};
const contentStyle = {
    minHeight: 'calc(100vh - 134px)',
    background: '#673ab7',
    padding: '10px 30px',
};
const footerStyle = {
    height: 70,
    background: '#673ab7',
    padding: '10px 50px',
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
                    <Footer style={footerStyle}>
                        <AppFooter outlet={outlet} />
                    </Footer>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
