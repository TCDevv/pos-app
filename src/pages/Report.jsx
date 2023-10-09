import '../styles/report.css';
import { Row, Col, Table, Modal } from 'antd';
import { getDate, convertPrice } from '../utils/util';
import { loadFromLocalStorage } from '../utils/localStorage';
import { AiFillEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Report = () => {
    const data = loadFromLocalStorage('listOrder');
    const outlet = useSelector((state) => state.outlet);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReceipt, setCurrentReceipt] = useState(null);
    const showModal = (item) => {
        setCurrentReceipt(item);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'stt',
            showSorterTooltip: false,
            width: 60,
            render: (item, record, index) => <>{index + 1}</>,
        },
        {
            title: 'Hóa đơn',
            dataIndex: 'code',
            key: 'code',
            width: 150,
        },
        {
            title: 'Bàn',
            dataIndex: 'tableName',
            key: 'tableName',
            width: 150,
        },
        {
            title: 'Thời gian',
            key: 'time',
            dataIndex: 'time',
            width: 150,
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            dataIndex: 'total',
            width: 150,
            render: (total) => <>{convertPrice(total)}</>,
        },
        {
            title: '',
            key: 'action',
            render: (item, record) => <AiFillEye className='view-icon' onClick={() => showModal(item)} />,
        },
    ];
    const itemColumns = [
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <>{convertPrice(value)}</>,
        },
        {
            title: 'Tổng',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (value) => <>{convertPrice(value)}</>,
        },
    ];
    return (
        <div className='container report-container'>
            <h3>Báo cáo cuối ngày</h3>
            {getDate()}
            <Row align={'center'} style={{ marginTop: 10, width: '100%' }}>
                <Col md={16} xs={24}>
                    <Table columns={columns} dataSource={data} scroll={{ y: '40vh', x: 350 }} />
                </Col>
            </Row>
            <Modal open={isModalOpen} onCancel={closeModal} onOk={() => setIsModalOpen(false)}>
                <div className='bill-container'>
                    <h3>{outlet?.name}</h3>
                    <span>{outlet?.address}</span>
                    <h3>Hoá đơn {currentReceipt?.code}</h3>
                    <div className='row-space'>
                        <span>Giờ order:</span>
                        <span>{currentReceipt?.time}</span>
                    </div>
                    <Table dataSource={currentReceipt?.items} columns={itemColumns} bordered pagination={false} />
                    <div className='row-space'>
                        <span>Tổng dịch vụ</span>
                        <span>{convertPrice(currentReceipt?.total)}</span>
                    </div>
                    <div className='row-space'>
                        <span>Thanh toán</span>
                        <h2>{convertPrice(currentReceipt?.total)}</h2>
                    </div>
                    <span className='text-center'>
                        Quý khách vui lòng kiểm tra lại hóa đơn trước khi thanh toán
                        <br />
                        Xin cám ơn quý khách.
                        <br />
                        Hẹn gặp lại quý khách lần sau
                    </span>
                </div>
            </Modal>
        </div>
    );
};

export default Report;
