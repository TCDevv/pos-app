import { IoIosArrowBack } from 'react-icons/io';
import { Divider, Input, Select, Checkbox, Button, Modal, Table } from 'antd';
import '../styles/payment.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrderTableById, setOrderProcess } from '../actions/orderActions';
import { ORDERING } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import { setCurrentProcess } from '../actions/processActions';
import { convertPrice, getHHmmddMMYY } from '../utils/util';
import { useCallback, useState } from 'react';

const Payment = ({ currentTable, currentProductList, selectedTables }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeOrder, setTimeOrder] = useState('');
    const dispatch = useDispatch();
    const outlet = useSelector((state) => state.outlet);
    const onpenModal = () => {
        setTimeOrder(getHHmmddMMYY());
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const getTableName = useCallback(
        (tableId) => {
            const tableName = selectedTables.find((item) => (item.id = tableId)).name;
            return tableName.includes('HD') ? tableName : `Bàn ${tableName}`;
        },
        [selectedTables]
    );
    const columns = [
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
    const doPayment = () => {
        var newData = {
            time: timeOrder,
            table: currentTable,
            tableName: getTableName(currentTable),
            items: currentProductList,
        };
        var orderHistory = loadFromLocalStorage('listOrder') || [];
        saveToLocalStorage('listOrder', [...orderHistory, newData]);
        dispatch(removeOrderTableById(currentTable));
        setIsModalOpen(false);
    };
    return (
        <div className='payment-container'>
            <div className='payment-info'>
                <div
                    className='back-btn'
                    onClick={() => {
                        dispatch(setOrderProcess(ORDERING, currentTable));
                        dispatch(setCurrentProcess(ORDERING));
                    }}
                >
                    <IoIosArrowBack />
                    Xem hóa đơn
                </div>
                <div className='total-payment'>
                    <strong>Tổng tiền:</strong>
                    <span>{convertPrice(currentProductList.reduce((acc, curr) => acc + curr.subtotal, 0))}</span>
                </div>
            </div>
            <Divider />
            <div className='discount-container'>
                <div className='discount-picker'>
                    <span>Giảm giá (%)</span>
                    <div className='picker-container'>
                        <div className='picker'>5%</div>
                        <div className='picker'>10%</div>
                        <div className='picker'>15%</div>
                        <div className='picker'>20%</div>
                        <div className='picker'>25%</div>
                        <div className='picker'>30%</div>
                        <div className='picker'>35%</div>
                        <div className='picker'>40%</div>
                        <div className='picker'>45%</div>
                        <div className='picker'>50%</div>
                    </div>
                </div>
                <div className='discount-input'>
                    <Input value={0} />
                </div>
            </div>
            <Divider />
            <div className='payment-method'>
                <span>Phương thức thanh toán</span>
                <Select
                    style={{ width: 150 }}
                    value={1}
                    options={[
                        {
                            value: 1,
                            label: 'Tiền mặt',
                        },
                        {
                            value: 2,
                            label: 'Chuyển khoản',
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className='cash-summary'>
                <span>Khách đưa</span>
                <Input value={0} />
                <span>Tiền thừa</span>
                <span>0</span>
            </div>
            <div className='status-container'>
                <strong>Tình trạng</strong>
                <Select
                    style={{ width: 150 }}
                    value={1}
                    options={[
                        {
                            value: 1,
                            label: 'Hoàn thành',
                        },
                        {
                            value: 2,
                            label: 'Hoàn thành và đang giao hàng',
                        },
                        {
                            value: 3,
                            label: 'Chờ xử lý',
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className='print-container'>
                <Checkbox>In hóa đơn</Checkbox>
            </div>
            <Divider />
            <div className='payment-action'>
                <Button danger type='primary'>
                    Hủy
                </Button>
                <Button type='primary' className='primary-btn' onClick={() => onpenModal()}>
                    Thanh toán
                </Button>
            </div>
            <Modal
                open={isModalOpen}
                onCancel={closeModal}
                onOk={doPayment}
                okText='Thanh toán'
                cancelText='Hủy'
                okButtonProps={{ style: { background: 'rgb(103, 58, 183)' } }}
            >
                <div className='bill-container'>
                    <h3>{outlet?.name}</h3>
                    <span>{outlet?.address}</span>
                    <h3>Hoá đơn {getTableName(currentTable)}</h3>
                    <div className='row-space'>
                        <span>Giờ order:</span>
                        <span>{timeOrder}</span>
                    </div>
                    <Table dataSource={currentProductList} columns={columns} bordered pagination={false} />
                    <div className='row-space'>
                        <span>Tổng dịch vụ</span>
                        <span>{convertPrice(currentProductList.reduce((acc, curr) => acc + curr.subtotal, 0))}</span>
                    </div>
                    <div className='row-space'>
                        <span>Thanh toán</span>
                        <h2>{convertPrice(currentProductList.reduce((acc, curr) => acc + curr.subtotal, 0))}</h2>
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

export default Payment;
