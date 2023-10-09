import '../styles/footer.css';

const AppFooter = ({ outlet }) => {
    return (
        <div>
            <div className='social'>
                <a>
                    <img src='https://cdn-icons-png.flaticon.com/128/2111/2111646.png' alt='' />
                </a>
                <a>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968764.png' alt='' />
                </a>
                <a>
                    <img src='https://cdn-icons-png.flaticon.com/128/906/906382.png' alt='' />
                </a>
            </div>
            <div className='info'>Chi nhánh: {outlet?.address}</div>
        </div>
    );
};

export default AppFooter;
