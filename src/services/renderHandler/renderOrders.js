import { domElements } from '../../shared/index';
import views from '../../views/index';

const { getTableRowTemplate } = views;

const renderOrders = (data) => {
    domElements.ordersTable.textContent = '';
    let fragment = '';
    data.forEach((order, i) => {
        const tableRow = getTableRowTemplate(order, i);
        fragment += tableRow;
    });

    if (fragment) {
        domElements.ordersTable.insertAdjacentHTML('beforeEnd', fragment);
    }
};

export default renderOrders;
