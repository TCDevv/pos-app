export const convertPrice = (price) => {
    if (!price) return '';
    return price.toLocaleString('en-US');
};

export const getDateTimeNow = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '10' + seconds : seconds)
    }`;
};

export const getHHmmddMMYY = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ' ' +
        (day < 10 ? '0' + day : day) +
        '/' +
        (month < 10 ? '0' + month : month) +
        '/' +
        year
    }`;
};

export const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${
        'Ngày ' + (day < 10 ? '0' + day : day) + ' Tháng ' + (month < 10 ? '0' + month : month) + ' Năm ' + year
    }`;
};

export const generateReceiptCode = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `HD${year.toString().slice(2)}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}${
        hours < 10 ? '0' + hours : hours
    }${minutes < 10 ? '0' + minutes : minutes}${seconds < 10 ? '10' + seconds : seconds}`;
};
