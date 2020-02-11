import data from '../dataRepo/index';
import {
    CONSTANTS,
} from '../../shared/index';
import renderOrders from '../renderHandler/renderOrders';
import {
    setFilterResultOnchangeStatusOrder,
} from './index';

const { State } = CONSTANTS;

const closeModalWindow = (element) => {
    element.remove();
    State.isModalWindowOrdersOpen = false;
};

const changeOrderStatusToWork = (idOrder, element) => {
    const currentOrder = data.getOneOrder(idOrder);
    currentOrder.active = true;
    data.updateOrder(idOrder, currentOrder);
    data.setDataToLocalStorage();
    renderOrders(data.getOrders());
    closeModalWindow(element);
};

const changeOrderStatusCompleted = (idOrder, element) => {
    data.deleteOrder(idOrder);
    data.setDataToLocalStorage();
    renderOrders(data.getOrders());
    closeModalWindow(element);
};

const changeOrderStatusCanseled = (idOrder, element) => {
    const currentOrder = data.getOneOrder(idOrder);
    currentOrder.active = false;
    data.updateOrder(idOrder, currentOrder);
    data.setDataToLocalStorage();
    renderOrders(data.getOrders());
    closeModalWindow(element);
};

const handlerModal = (idOrder, element) => {
    element.addEventListener('click', (event) => {
        const { target } = event;
        const dataTarget = target.dataset.action;
        const actionType = {
            close: () => closeModalWindow(element),
            takeOrder: () => changeOrderStatusToWork(idOrder, element, event),
            completed: () => changeOrderStatusCompleted(idOrder, element, event),
            canseled: () => changeOrderStatusCanseled(idOrder, element, event),
        };

        if (Object.prototype.hasOwnProperty.call(actionType, dataTarget)) {
            actionType[dataTarget]();
            setFilterResultOnchangeStatusOrder();
        }
    });
};

export default handlerModal;
