import { formatToMoney } from '../services/validateHandler/index';

const getModalTemplate = (order) => {
    const {
        title,
        firstName,
        email,
        description,
        deadline,
        amount,
        phone,
        localeParameter,
        currencyParameter,
    } = order;

    return (
        `<div id="modal-window" class="order-modal modal bd-example-modal-lg" data-action="close">
        <div class="modal-dialog modal-lg m-auto" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h4 class="modal-title ">${title}</h4>
                    <button type="button" class="close text-white" aria-label="Close" data-action="close">
                        <span aria-hidden="true" data-action="close">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <b>Имя заказчика: </b><span class="firstName">${firstName}</span>
                        </div>
                        <div class="col-6">
                            <b>Email заказчика: </b><a class="email" href="${email}">${email}</a>
                        </div>
                        <div class="col-12 bg-info text-white my-4">
                            <h5>Подробное описание задачи</h5>
                            <p class="description">${description}</p>
                        </div>
                        <div
                            class="col-12 bg-warning text-dark pt-2 d-flex justify-content-around align-content-center">
                            <h5>Срок сдачи проекта</h5>
                            <p class="deadline">${deadline}</p>
                        </div>
                        <div class="timer">
                            <p>Таймер дедлайна: </p>
                            <span class="modal-window-left-dyas" id="modal-window-left-dyas"></span>
                            <span class="modal-window-left-hours" id="modal-window-left-hours"></span>
                            <span class="modal-window-left-minutes" id="modal-window-left-minutes"></span>
                            <span class="modal-window-left-seconds" id="modal-window-left-seconds"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <div class="modal-currency">
                        <span class="text">Оплата:</span>
                        <span class="count">${formatToMoney(amount, localeParameter, currencyParameter)}</span>
                    </div>
                    <div>
                        <button type="button" class="btn btn-info" ${phone ? '' : 'disabled'}>
                            <a class="phone text-white" ${phone ? `href="tel:${phone}"` : ''} >Связаться</a>
                        </button>
                        <button type="button" class="btn btn-success get-order" data-action="takeOrder">Взять заказ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    );
};

export default getModalTemplate;
