import { Button, Checkbox, Divider, Input, Modal, Select, Table, Popconfirm } from 'antd';
import { useCallback, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTable } from '../actions/currentTable';
import { removeOrderTableById, setOrderProcess } from '../actions/orderActions';
import { setCurrentProcess } from '../actions/processActions';
import '../styles/payment.css';
import { BANKING, CASH, ORDERING } from '../utils/constants';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { convertPrice, getHHmmddMMYY } from '../utils/util';

const Payment = ({ currentTable, currentProductList, selectedTables, handleRemoveTable }) => {
    const timeOrder = loadFromLocalStorage('currentOrder')?.find((item) => item.table.id === currentTable)?.timeOrder;
    const billCode = loadFromLocalStorage('currentOrder')?.find((item) => item.table.id === currentTable)?.code;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timePrintBill, setTimePrintBill] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(CASH);
    const dispatch = useDispatch();
    const outlet = useSelector((state) => state.outlet);
    const onpenModal = () => {
        setTimePrintBill(getHHmmddMMYY());
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const checkCancelDisabled = () => {
        var result = false;
        currentProductList.forEach((item) => {
            if (item.billBep) {
                result = true;
            }
        });
        return result;
    };
    const getTableName = useCallback(
        (tableId) => {
            const tableName = selectedTables.find((item) => item.id === tableId).name;
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
            code: billCode,
            timeOrder: timeOrder,
            timePrintBill: timePrintBill,
            tableName: getTableName(currentTable),
            items: currentProductList,
            total: currentProductList.reduce((acc, curr) => acc + curr.subtotal, 0),
            paymentMethod: paymentMethod,
            id_staff: '',
            customer: '',
        };
        var orderHistory = loadFromLocalStorage('listOrder') || [];
        saveToLocalStorage('listOrder', [...orderHistory, newData]);
        dispatch(removeOrderTableById(currentTable));
        const newSelectedTable = selectedTables.filter((item) => item.id !== currentTable);
        if (newSelectedTable.length) dispatch(setCurrentTable(newSelectedTable[0].id));
        else dispatch(setCurrentTable(null));
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
                    value={paymentMethod}
                    onChange={(value) => setPaymentMethod(value)}
                    options={[
                        {
                            value: CASH,
                            label: 'Tiền mặt',
                        },
                        {
                            value: BANKING,
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
                {checkCancelDisabled() ? (
                    <Popconfirm
                        title='Huỷ hóa đơn'
                        description='Hóa đơn này đã báo bếp và chưa thanh toán, bạn có muốn hủy không?'
                        onConfirm={handleRemoveTable}
                        okText='Hủy'
                        cancelText='Không hủy'
                    >
                        <Button danger>Hủy</Button>
                    </Popconfirm>
                ) : (
                    <Button danger type='primary' onClick={handleRemoveTable}>
                        Hủy
                    </Button>
                )}
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
                    <span>Khách hàng:</span>
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
                        <span>Giảm giá</span>
                        <span>0</span>
                    </div>
                    <div className='row-space'>
                        <span>Phương thức thanh toán</span>
                        <span>{paymentMethod === BANKING ? 'Chuyển khoản' : 'Tiền mặt'}</span>
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
