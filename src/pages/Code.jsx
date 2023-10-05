import { PAYMENT_CODE } from '../utils/constants';
import { Row } from 'antd';
import '../styles/code.css';

const Code = ({ type = PAYMENT_CODE }) => {
    return (
        <>
            <Row className='container code-container'>
                <h2>{type === PAYMENT_CODE ? 'Mã thanh toán' : 'Mã chấm công'}</h2>
                <span>
                    {type === PAYMENT_CODE
                        ? 'Quý khách vui lòng quét mã QRCODE để thanh toán'
                        : 'Nhân viên vui lòng quét mã QRCODE bên giới để chấm công. Chú ý: chỉ quét một lần là "Vô Ca" và "Tan ca"'}
                </span>
                <img src='https://www.qrstuff.com/images/default_qrcode.png' alt='' />
            </Row>
        </>
    );
};

export default Code;
