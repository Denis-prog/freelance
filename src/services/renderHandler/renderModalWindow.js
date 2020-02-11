import data from '../dataRepo/index';
import handlerModal from '../eventHandler/eventHandlerModal';
import views from '../../views/index';

const { getModalOnTemplate, getModalTemplate, leftTimerRender } = views;

const renderModalWindow = (idOrder) => {
    const orderData = data.getOneOrder(idOrder);
    const currentModalWindow = orderData.active
        ? getModalOnTemplate(orderData)
        : getModalTemplate(orderData);

    document.querySelector('body').insertAdjacentHTML('beforeEnd', currentModalWindow);
    const modalWindow = document.getElementById('modal-window');
    const fieldLeftDays = modalWindow.querySelector('#modal-window-left-dyas');
    const fieldLeftHours = modalWindow.querySelector('#modal-window-left-hours');
    const fieldLeftMinutes = modalWindow.querySelector('#modal-window-left-minutes');
    const fieldLeftSeconds = modalWindow.querySelector('#modal-window-left-seconds');
    const fieldsForTimer = [fieldLeftDays, fieldLeftHours, fieldLeftMinutes, fieldLeftSeconds];

    handlerModal(idOrder, modalWindow);
    leftTimerRender(orderData.deadline, fieldsForTimer);
};

export default renderModalWindow;
