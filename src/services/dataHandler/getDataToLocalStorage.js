const getDataToLocalStorage = () => {
    const data = localStorage.getItem('orders');
    if (data) {
        return JSON.parse(localStorage.getItem('orders'));
    }
    return ('orders', []);
};

export default getDataToLocalStorage;
