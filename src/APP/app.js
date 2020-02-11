import data from '../services/dataRepo/index';
import {
    domElements,
    generateId,
    CONSTANTS,
} from '../shared/index';
import {
    renderOrders,
    renderModalWindow,
} from '../services/renderHandler/index';
import {
    formatValueInputAmount,
    saveCurrentValueAmountInput,
    setCurrentValueInputAmount,
    setMinDateAttribute,
    showFillFieldIndicator,
    setDefaultValidateSettings,
    clearIndicationAboutValidation,
    clearAllIndicationAboutValidationAfterSubmit,
    checkInputForRegExp,
    showDescriptionErrorValid,
    generalValidation,
} from '../services/validateHandler/index';
import {
    setInputsPrice,
    showOrdersByFilter,
    setPriceDiaposon,
    setInputRangeOption,
    getValueInputsPrice,
    setGeneralFilter,
    filterFieldStatusOrder,
    resetInputRangeValue,
    resetFilterStatusOrder,
    renderDefaultOrders,
    sortOrders,
    filterFieldPrice,
    filterFieldCurrency,
    setFieldCurrentFilterResult,
} from '../services/eventHandler/index';

const { Repo, State } = CONSTANTS;

const init = () => {
    setMinDateAttribute();
    domElements.ordersTableHead.addEventListener('click', (event) => {
        sortOrders(event);
    });

    domElements.ordersTable.addEventListener('click', (event) => {
        const { target } = event;
        const targetOrder = target.closest('.order');
        const idOrder = +targetOrder.dataset.id;

        if (targetOrder) {
            renderModalWindow(idOrder);
            State.isModalWindowOrdersOpen = true;
        }
    });

    domElements.customer.addEventListener('click', () => {
        domElements.blockCustomer.style.display = 'block';
        domElements.blockChoice.style.display = 'none';
        domElements.btnExit.style.display = 'block';
    });

    domElements.freelancer.addEventListener('click', () => {
        domElements.blockFreelancer.style.display = 'block';
        domElements.blockChoice.style.display = 'none';
        domElements.btnExit.style.display = 'block';
        [...domElements.filterPriceInputsRange].forEach((element) => {
            const currentElement = element;
            currentElement.addEventListener('input', (event) => {
                getValueInputsPrice(event);
            });
        });

        resetFilterStatusOrder();
        renderOrders(data.getOrders());
        setPriceDiaposon();
        setInputsPrice();
        setInputRangeOption();
        filterFieldCurrency(domElements.filterFormCurrencyRuble);
        filterFieldPrice();
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
    domElements.btnExit.addEventListener('click', () => {
        domElements.btnExit.style.display = 'none';
        domElements.blockFreelancer.style.display = 'none';
        domElements.blockCustomer.style.display = 'none';
        domElements.blockChoice.style.display = 'block';
    });
    domElements.customerFormBtn.addEventListener('click', () => {
        const inputsValue = {};

        [...domElements.formCustomer.elements].forEach((elem) => {
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio' && elem.getAttribute('id') !== 'amount')
                || elem.tagName === 'TEXTAREA') {
                inputsValue[elem.name] = elem.value.trim();
            }

            if ((elem.type === 'radio' && elem.checked)) {
                inputsValue[elem.name] = elem.value;
                inputsValue.localeParameter = elem.getAttribute('data-locale-parameter');
                inputsValue.currencyParameter = elem.getAttribute('data-currency-parameter');
            }
        });

        domElements.formCustomer.reset();
        const orders = data.getOrders();
        const ordersLength = orders.length;
        inputsValue.id = ordersLength
            ? generateId(orders[ordersLength - 1].id)
            : generateId();
        inputsValue.amount = Repo.currentValueInputAmount;
        data.addOrder(inputsValue);
        data.setDataToLocalStorage();
        Repo.currentValueInputAmount = '';
        clearAllIndicationAboutValidationAfterSubmit();
    });

    domElements.formCustomerInputAmount.addEventListener('keyup', saveCurrentValueAmountInput);
    domElements.formCustomerInputAmount.addEventListener('blur', formatValueInputAmount);
    domElements.formCustomerInputAmount.addEventListener('focus', setCurrentValueInputAmount);
    domElements.formRadioCurrencyBlock.addEventListener('change', formatValueInputAmount);
    domElements.formInputSectionCurrency.addEventListener('change', (event) => {
        filterFieldCurrency(event);
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
    domElements.filterPriceSliderChangeMin.addEventListener('change', (event) => {
        event.preventDefault();
        filterFieldPrice();
        setGeneralFilter();
        setFieldCurrentFilterResult(domElements.filterFormCurrencyRuble);
    });
    domElements.filterPriceSliderChangeMax.addEventListener('change', () => {
        filterFieldPrice();
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
    domElements.filterFormResetBtn.addEventListener('click', () => {
        domElements.filterFormCurrencyRuble.checked = true;
        renderDefaultOrders();
        resetInputRangeValue();
        resetFilterStatusOrder();
        filterFieldCurrency(domElements.filterFormCurrencyRuble);
        filterFieldPrice();
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
    domElements.filterFormSubmitBtn.addEventListener('click', () => {
        showOrdersByFilter();
    });
    domElements.formInputSectionStatusOrder.addEventListener('change', (event) => {
        filterFieldStatusOrder(event);
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
    domElements.formCustomer.addEventListener('input', (event) => {
        showFillFieldIndicator(event);
    });
    domElements.formCustomer.addEventListener('focusout', (event) => {
        setDefaultValidateSettings(event);
        checkInputForRegExp(event);
        showDescriptionErrorValid(event);
        generalValidation();
    });
    domElements.formCustomer.addEventListener('focusin', (event) => {
        clearIndicationAboutValidation(event);
    });
    domElements.filterSectionPrice.addEventListener('change', (event) => {
        getValueInputsPrice(event);
        filterFieldPrice();
        setGeneralFilter();
        setFieldCurrentFilterResult();
    });
};

export default init;
