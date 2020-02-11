import data from '../dataRepo/index';
import { domElements } from '../../shared/index';
import renderOrders from '../renderHandler/renderOrders';

let filterOptionCurrency = {
    currentName: null,
    currentValue: null,
    currentEvent: null,
    currentFilter: null,
};

const filterOptionPrice = {
    filteredOrdersAscending: [],
    startMaxValue: null,
    startMinValue: null,
    currentValueMin: null,
    currentValueMax: null,
    currentFilter: null,
};

const generalOptionFilter = {
    isFilterApplied: false,
    resultingFilteredArrayId: null,
};

const filterOptionStatusOrder = {
    wait: (order) => order.active,
    active: (order) => order.active,
    expired: (order) => new Date(`${order.deadline}T23:59:59`) - new Date() < 0,
    currentFilter: null,
    currentTargetValue: null,
};

const clearFieldsLabel = () => {
    const { length } = domElements.fieldForCurrentResult;
    for (let i = 0; i < length; i += 1) {
        domElements.fieldForCurrentResult[i].innerHTML = '';
    }
};

const setPriceDiaposon = (filteredOrdersAscending) => {
    const compare = (object1, object2) => {
        if (object1.amount && object2.amount) {
            return object1.amount - object2.amount;
        }
        return 0;
    };

    filterOptionPrice.filteredOrdersAscending = filteredOrdersAscending
        || data.getOrders().slice().sort(compare);

    if (filterOptionPrice.filteredOrdersAscending.length) {
        filterOptionPrice.startMaxValue = filterOptionPrice
            .filteredOrdersAscending[filterOptionPrice
                .filteredOrdersAscending.length - 1].amount;
        filterOptionPrice.startMinValue = filterOptionPrice.filteredOrdersAscending[0].amount;
        filterOptionPrice.currentValueMax = filterOptionPrice.startMaxValue;
        filterOptionPrice.currentValueMin = filterOptionPrice.startMinValue;
    } else {
        filterOptionPrice.currentValueMax = 0;
        filterOptionPrice.startMaxValue = 0;
        filterOptionPrice.currentValueMin = 0;
        filterOptionPrice.startMinValue = 0;
    }
};

const setInputsPrice = () => {
    domElements.filterPriceInputMin.value = filterOptionPrice.startMinValue || 0;
    domElements.filterPriceInputMax.value = filterOptionPrice.startMaxValue || 0;
};

const setInputRangeOption = () => {
    [...domElements.filterPriceInputsRange].forEach((element, currentIndex) => {
        const currentElement = element;
        currentElement.setAttribute('max', filterOptionPrice.startMaxValue);
        currentElement.setAttribute('min', filterOptionPrice.startMinValue);
        currentElement.value = currentIndex
            ? filterOptionPrice.startMaxValue || 0
            : filterOptionPrice.startMinValue || 0;
    });

    domElements.filterPriceInputsRange[1].style.backgroundImage = 'linear-gradient(to right, #fff9d1 0%, #00ccff 0%)';
};

const showIndicationRange = (event, currentValueMin, currentValueMax, activeInputValue) => {
    const currentTarget = event.isTrusted
        ? event.target
        : event;

    let currentIndex = +currentTarget.dataset.indexInArray;
    const currentValue = activeInputValue || currentTarget.value;
    let tmpIndex;
    let oppositeIndex = +(!currentIndex);
    const diaposon = (filterOptionPrice.startMaxValue - filterOptionPrice.startMinValue);
    const currentPercentStart = ((filterOptionPrice.startMaxValue - currentValue) * 100) / diaposon;

    const currentPercentEnd = ((domElements.filterPriceInputsRange[oppositeIndex]
        .value - filterOptionPrice.startMinValue) * 100) / diaposon;

    if (currentValueMin > currentValueMax) {
        tmpIndex = currentIndex;
        currentIndex = oppositeIndex;
        oppositeIndex = tmpIndex;
    }

    domElements.filterPriceInputsRange[1].style.backgroundImage = `linear-gradient(${!currentIndex ? 'to right' : 'to left'},
        #fff9d1 ${currentIndex ? currentPercentStart : 100 - currentPercentStart}%,
        #00ccff ${currentIndex ? currentPercentStart : 100 - currentPercentStart}%,
        #00ccff ${!currentIndex ? currentPercentEnd : 100 - currentPercentEnd}%,
        #fff9d1 ${!currentIndex ? currentPercentEnd : 100 - currentPercentEnd}%)`;
};

const resetInputRangeValue = () => {
    domElements.filterPriceInputsRange[0].value = filterOptionPrice.startMinValue;
    domElements.filterPriceInputsRange[1].value = filterOptionPrice.startMaxValue;
    domElements.filterPriceInputMin.value = filterOptionPrice.startMinValue;
    domElements.filterPriceInputMax.value = filterOptionPrice.startMaxValue;
    filterOptionPrice.currentValueMax = filterOptionPrice.startMaxValue;
    filterOptionPrice.currentValueMin = filterOptionPrice.startMinValue;
    filterOptionPrice.currentFilter = null;
    domElements.filterPriceInputsRange[1].style.backgroundImage = '';
};

const checkValueManualEntryPriceRange = (value, flag) => {
    const checkHandler = {
        min: (val) => {
            if (Number.isNaN(val) || val < 0) {
                return filterOptionPrice.startMinValue;
            }

            if (val > filterOptionPrice.currentValueMax) {
                const correctValue = filterOptionPrice.currentValueMax
                    === filterOptionPrice.currentValueMin
                    ? filterOptionPrice.currentValueMin
                    : filterOptionPrice.currentValueMax - 1;

                return correctValue;
            }

            if (val < filterOptionPrice.startMinValue) {
                return filterOptionPrice.startMinValue;
            }

            return val;
        },
        max: (val) => {
            if (Number.isNaN(val) || val < 0) {
                return filterOptionPrice.startMaxValue;
            }

            if (val < filterOptionPrice.currentValueMin) {
                const correctValue = filterOptionPrice.currentValueMax
                    === filterOptionPrice.currentValueMin
                    ? filterOptionPrice.currentValueMax
                    : filterOptionPrice.currentValueMax + 1;

                return correctValue;
            }

            if (val > filterOptionPrice.startMaxValue) {
                return filterOptionPrice.startMaxValue;
            }

            return val;
        },
    };

    return checkHandler[flag](value);
};

const getValueInputsPrice = (event) => {
    const currentElement = event.target;
    const currentElementInputMethod = currentElement.dataset.inputMethod;
    let currentValueMin;
    let currentValueMax;
    let tmpValue;

    if (currentElementInputMethod) {
        if (currentElementInputMethod === 'usingSlider') {
            currentValueMin = +domElements.filterPriceInputsRange[0].value;
            currentValueMax = +domElements.filterPriceInputsRange[1].value;
            showIndicationRange(event, currentValueMin, currentValueMax);
        } else if (currentElementInputMethod === 'usingManualInput') {
            const currentElementTypeInput = currentElement.dataset.typeInput;
            const [sliderMin, sliderMax] = domElements.filterPriceInputsRange;

            if (currentElementTypeInput === 'currentValueMin') {
                currentValueMin = checkValueManualEntryPriceRange(
                    +domElements.filterPriceInputMin.value, 'min',
                );

                domElements.filterPriceInputMin.value = currentValueMin;
                currentValueMax = filterOptionPrice.currentValueMax;

                showIndicationRange(sliderMin,
                    currentValueMin, currentValueMax, currentElement.value);
            } else if (currentElementTypeInput === 'currentValueMax') {
                currentValueMin = filterOptionPrice.currentValueMin;
                currentValueMax = checkValueManualEntryPriceRange(
                    +domElements.filterPriceInputMax.value, 'max',
                );

                domElements.filterPriceInputMax.value = currentValueMax;

                showIndicationRange(sliderMax,
                    currentValueMin, currentValueMax, currentElement.value);
            }
        }
    }

    if (currentValueMin > currentValueMax) {
        tmpValue = currentValueMax;
        currentValueMax = currentValueMin;
        currentValueMin = tmpValue;
    }

    filterOptionPrice.currentValueMin = currentValueMin;
    filterOptionPrice.currentValueMax = currentValueMax;

    if (currentElementInputMethod === 'usingSlider') {
        domElements.filterPriceInputMin.value = currentValueMin;
        domElements.filterPriceInputMax.value = currentValueMax;
    } else if (currentElementInputMethod === 'usingManualInput') {
        domElements.filterPriceInputsRange[0].value = currentValueMin;
        domElements.filterPriceInputsRange[1].value = currentValueMax;
    }
};

const renderDefaultOrders = () => {
    if (generalOptionFilter.isFilterApplied) {
        data.setSortOrders([]);
        data.setFilteredOrders([]);
        renderOrders(data.getOrders());
        filterOptionCurrency = {};
        filterOptionStatusOrder.currentTargetValue = null;
        domElements.tableColumnDeadline.classList.remove('table-column-deadline-descending');
        domElements.tableColumnDeadline.classList.remove('table-column-deadline-ascending');
        domElements.resetSortIndication.style.display = 'none';
    }
};

const setGeneralFilter = () => {
    const countFilter = filterOptionStatusOrder.currentFilter /* в скольки фильтр дб совпадения-1 */
        ? 2
        : 1;
    let generalFilter = [];

    generalFilter = generalFilter.concat(
        filterOptionPrice.currentFilter,
        filterOptionCurrency.currentFilter,
        filterOptionStatusOrder.currentFilter,
    );

    generalFilter = generalFilter
        .reduce((accumulator, currentValue, index, array) => {
            const count = array.filter((item, indexItem) => item === currentValue
                && item !== null
                && item !== undefined
                && index !== indexItem);

            if (count.length === countFilter) {
                if (accumulator.indexOf(count[0]) === -1
                    && count !== undefined) {
                    accumulator.push(count[0]);
                }
            }

            return accumulator;
        }, []);

    generalOptionFilter.resultingFilteredArrayId = generalFilter;
};

const setFieldCurrentFilterResult = () => {
    clearFieldsLabel();

    if (generalOptionFilter.resultingFilteredArrayId) {
        const lengthArray = generalOptionFilter.resultingFilteredArrayId.length;
        filterOptionCurrency.label.innerHTML = lengthArray;
    }
};

const filterFieldCurrency = (event) => {
    if (event) {
        filterOptionCurrency.currentEvent = event;
        const elem = filterOptionCurrency.currentEvent.isTrusted
            ? filterOptionCurrency.currentEvent.target
            : filterOptionCurrency.currentEvent;
        filterOptionCurrency.currentName = elem.name;
        filterOptionCurrency.currentValue = elem.value;
        filterOptionCurrency.label = domElements[elem.dataset.field];

        const filterData = data.getSortOrders()
            .filter((current) => current[filterOptionCurrency
                .currentName] === filterOptionCurrency.currentValue)
            .map((current) => current.id);

        filterOptionCurrency.currentFilter = filterData.length ? filterData : [];

        if (!filterOptionCurrency.currentEvent.isTrusted) {
            filterOptionCurrency.currentEvent.checked = true;
        }
    }
};

const resetFilterStatusOrder = () => {
    [...domElements.formInputSectionStatusOrder.children].forEach((item) => {
        const currentInput = item;
        if (currentInput.type === 'radio') {
            currentInput.checked = false;
        }
    });

    filterOptionStatusOrder.currentFilter = null;
};

const filterFieldPrice = () => {
    const filterData = data.getSortOrders()
        .filter((item) => item.amount >= (filterOptionPrice.currentValueMin
            || filterOptionPrice.startMinValue)
            && item.amount <= (filterOptionPrice.currentValueMax
                || filterOptionPrice.startMaxValue))
        .map((item) => item.id);

    filterOptionPrice.currentFilter = filterData.length ? filterData : [];
};

const filterFieldStatusOrder = (event) => {
    filterOptionStatusOrder.currentTargetValue = event.target.value;

    if (filterOptionStatusOrder.currentTargetValue) {
        const currentValue = filterOptionStatusOrder.currentTargetValue;
        const filterData = data.getSortOrders()
            .filter((item) => (currentValue === 'wait'
                ? !filterOptionStatusOrder[currentValue](item)
                : filterOptionStatusOrder[currentValue](item)))
            .map((item) => item.id);

        filterOptionStatusOrder.currentFilter = filterData.length ? filterData : [];
    }
};

const showOrdersByFilter = () => {
    const orders = data.getSortOrders();
    const currentFilterOrdersId = generalOptionFilter.resultingFilteredArrayId;
    const filteredOrders = orders
        .filter((item1) => currentFilterOrdersId.some((item2) => item1.id === item2));

    renderOrders(filteredOrders);
    data.setFilteredOrders(filteredOrders);
    generalOptionFilter.isFilterApplied = true;
};

const setFilterResultOnchangeStatusOrder = () => {
    domElements.filterFormCurrencyRuble.checked = true;
    renderDefaultOrders();
    resetInputRangeValue();
    resetFilterStatusOrder();
    filterFieldCurrency(domElements.filterFormCurrencyRuble);
    filterFieldPrice();
    setGeneralFilter();
    setFieldCurrentFilterResult();
};

export {
    clearFieldsLabel,
    renderDefaultOrders,
    setPriceDiaposon,
    setInputsPrice,
    filterFieldPrice,
    filterFieldCurrency,
    filterFieldStatusOrder,
    setGeneralFilter,
    setFieldCurrentFilterResult,
    setInputRangeOption,
    getValueInputsPrice,
    showOrdersByFilter,
    resetInputRangeValue,
    resetFilterStatusOrder,
    setFilterResultOnchangeStatusOrder,
};
