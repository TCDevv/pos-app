import { Button, Col, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/report.css';
import { BANKING } from '../utils/constants';
import { loadFromLocalStorage } from '../utils/localStorage';
import { convertPrice, getDate } from '../utils/util';

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
            render: (value, record) => (
                <Button type='link' onClick={(event) => showModal(record)}>
                    {value}
                </Button>
            ),
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            dataIndex: 'total',
            width: 150,
            render: (total) => <>{convertPrice(total)}</>,
        },
        {
            title: 'Bàn',
            dataIndex: 'tableName',
            key: 'tableName',
            width: 150,
        },
        {
            title: 'Thời gian order',
            key: 'timeOrder',
            dataIndex: 'timeOrder',
            width: 150,
        },
        {
            title: 'Thời gian xuất bill',
            key: 'timePrintBill',
            dataIndex: 'timePrintBill',
            width: 150,
        },
        {
            title: 'Phương thức thanh toán',
            key: 'paymentMethod',
            dataIndex: 'paymentMethod',
            width: 150,
            render: (value) => <>{value === BANKING ? 'Chuyển khoản' : 'Tiền mặt'}</>,
        },
        {
            title: 'Khách hàng',
            key: 'customer',
            dataIndex: 'customer',
            width: 150,
        },
        {
            title: 'Nhân viên',
            key: 'id_staff',
            dataIndex: 'id_staff',
            width: 150,
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
                <Col md={24} xs={24}>
                    <Table columns={columns} dataSource={data} scroll={{ y: '40vh', x: 350 }} />
                </Col>
            </Row>
            <Modal open={isModalOpen} onCancel={closeModal} onOk={() => setIsModalOpen(false)} okText='In'>
                <div className='bill-container'>
                    <h3>{outlet?.name}</h3>
                    <span>{outlet?.address}</span>
                    <h3>Hoá đơn {currentReceipt?.code}</h3>
                    <div className='row-space'>
                        <span>Giờ order:</span>
                        <span>{currentReceipt?.timeOrder}</span>
                    </div>
                    <Table dataSource={currentReceipt?.items} columns={itemColumns} bordered pagination={false} />
                    <div className='row-space'>
                        <span>Tổng dịch vụ</span>
                        <span>{convertPrice(currentReceipt?.total)}</span>
                    </div>
                    <div className='row-space'>
                        <span>Phương thức thanh toán</span>
                        <span>{currentReceipt?.paymentMethod === BANKING ? 'Chuyển khoản' : 'Tiền mặt'}</span>
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
