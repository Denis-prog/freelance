import getDataToLocalStorage from '../dataHandler/index';

class DataRepo {
    constructor() {
        this.orders = [];
        this.sortOrders = [];
        this.filteredOrders = [];
    }

    // eslint-disable-next-line no-return-assign
    getOrders = () => (this.orders.length ? this.orders : this.orders = getDataToLocalStorage('orders'));

    getSortOrders = () => (this.sortOrders.length ? this.sortOrders : this.orders);

    // eslint-disable-next-line no-return-assign
    setSortOrders = (object) => this.sortOrders = object;

    getFilteredOrders = () => (this.filteredOrders.length ? this.filteredOrders : this.orders);

    // eslint-disable-next-line no-return-assign
    setFilteredOrders = (object) => this.filteredOrders = object;

    getOneOrder = (id) => this.orders.find((item) => item.id === +id);

    addOrder = (order) => this.orders.push(order);

    // eslint-disable-next-line no-return-assign
    deleteOrder = (id) => this.orders = this.orders.filter((item) => item.id !== +id);

    updateOrder = (id, object) => {
        const index = this.orders.findIndex((item) => item.id === +id);
        this.orders.splice(index, object);
    };

    setDataToLocalStorage = () => localStorage.setItem('orders', JSON.stringify(this.orders));
}

const data = new DataRepo();

export default data;
