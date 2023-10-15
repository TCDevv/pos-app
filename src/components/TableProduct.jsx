import { Table, Modal } from 'antd';
import { AiTwotoneDelete } from 'react-icons/ai';
import '../styles/tableProduct.css';
import { convertPrice } from '../utils/util';
import { Space, Button, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENTING } from '../utils/constants';
import { setBillBep, setOrderProcess } from '../actions/orderActions';
import { setCurrentProcess } from '../actions/processActions';
import { loadFromLocalStorage } from '../utils/localStorage';
import { useEffect, useState } from 'react';

const TableProduct = ({ data, removeProduct, currentTable, changeQuantity, handleRemoveTable }) => {
    const timeOrder = loadFromLocalStorage('currentOrder')?.find((item) => item.table.id === currentTable)?.timeOrder;
    const billCode = loadFromLocalStorage('currentOrder')?.find((item) => item.table.id === currentTable)?.code;
    const outlet = useSelector((state) => state.outlet);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataBillBep, setDataBillBep] = useState([]);
    const onpenModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const doBillBep = () => {
        setIsModalOpen(false);
        dispatch(setBillBep(data, currentTable));
        setDataBillBep([]);
    };
    const checkCancelDisabled = () => {
        var result = false;
        data.forEach((item) => {
            if (item.billBep) {
                result = true;
            }
        });
        return result;
    };
    useEffect(() => {
        var newData = [];
        data.forEach((item) => {
            if ((item.billBep && item.quantity > item.billBep) || !item.billBep) {
                item.quantityBep = item.quantity - (item.billBep || 0);
                newData.push(item);
            }
        });
        setDataBillBep(newData);
    }, [data]);

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
            title: 'Sản phẩm',
            dataIndex: 'title',
            key: 'title',
            width: 100,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (quantity, record, index) => (
                <>
                    <InputNumber
                        style={{ width: 70 }}
                        value={quantity}
                        min={record.billBep || 0}
                        onChange={(value) => changeQuantity(value, record, index)}
                    />
                </>
            ),
        },
        {
            title: 'Giá',
            key: 'price',
            dataIndex: 'price',
            width: 100,
            render: (price) => <>{convertPrice(price)}</>,
        },
        {
            title: 'Giảm giá',
            key: 'discount',
            dataIndex: 'discount',
            width: 100,
        },
        {
            title: 'Thành tiền',
            key: 'subtotal',
            dataIndex: 'subtotal',
            width: 100,
            fixed: 'right',
            render: (subtotal) => <>{convertPrice(subtotal)}</>,
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            render: (item, record) =>
                !record.billBep && <AiTwotoneDelete className='icon-delete' onClick={() => removeProduct(record.id)} />,
        },
    ];

    const columnForPrint = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'stt',
            showSorterTooltip: false,
            width: 60,
            render: (item, record, index) => <>{index + 1}</>,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'title',
            key: 'title',
            width: 100,
        },
        {
            title: 'Số lượng',
            width: 100,
            dataIndex: 'quantityBep',
            key: 'quantityBep',
        },
    ];

    return (
        <div className='table-product-container'>
            <div className='table-product'>
                <div className='receipt-info'>
                    <span>Số lượng sản phẩm: {data.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
                    <span>Thành tiền: {convertPrice(data.reduce((acc, curr) => acc + curr.subtotal, 0))}</span>
                </div>
                <Table columns={columns} dataSource={data} scroll={{ y: '40vh', x: 600 }} />
            </div>
            <div className='receipt-action'>
                <Space wrap>
                    <Button type='primary' className='primary-btn'>
                        Đổi bàn
                    </Button>
                    <Button danger type='primary' onClick={handleRemoveTable} disabled={checkCancelDisabled()}>
                        Hủy
                    </Button>
                    <Button type='primary' className='primary-btn'>
                        T.T nhanh
                    </Button>
                    <Button
                        type='primary'
                        className='primary-btn'
                        onClick={() => {
                            dispatch(setOrderProcess(PAYMENTING, currentTable));
                            dispatch(setCurrentProcess(PAYMENTING));
                        }}
                    >
                        Tiếp tục
                    </Button>
                    <Button type='primary' className='primary-btn'>
                        Báo bếp
                    </Button>
                    <Button type='primary' className='primary-btn' onClick={onpenModal}>
                        Bill bếp
                    </Button>
                </Space>
                <Modal
                    open={isModalOpen}
                    onCancel={closeModal}
                    onOk={doBillBep}
                    okText='In'
                    cancelText='Hủy'
                    okButtonProps={{ style: { background: 'rgb(103, 58, 183)' } }}
                >
                    <div className='bill-container'>
                        <h3>{outlet?.name}</h3>
                        <span>{outlet?.address}</span>
                        <h3>Hoá đơn {billCode}</h3>
                        <div className='row-space'>
                            <span>Giờ order:</span>
                            <span>{timeOrder}</span>
                        </div>
                        <Table dataSource={dataBillBep} columns={columnForPrint} bordered pagination={false} />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TableProduct;
