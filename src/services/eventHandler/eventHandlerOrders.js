import renderOrders from '../renderHandler/renderOrders';
import data from '../dataRepo/index';
import { domElements } from '../../shared/index';

const getReverse = (event) => {
    const { target } = event;
    const isReverse = +(target.closest('th').dataset.isReverse);
    const reverse = !isReverse;
    target.dataset.isReverse = Number(reverse);
    return isReverse;
};

const showSortDirection = (isReverse) => {
    if (isReverse) {
        domElements.tableColumnDeadline.classList.remove('table-column-deadline-descending');
        domElements.tableColumnDeadline.classList.add('table-column-deadline-ascending');
        return;
    }

    domElements.tableColumnDeadline.classList.add('table-column-deadline-descending');
    domElements.tableColumnDeadline.classList.remove('table-column-deadline-ascending');
};

const sortOrders = (event, isReverse = getReverse(event)) => {
    const { typeSort } = event.target.dataset;
    function compare(objectItem1, objectItem2) {
        if (typeSort === 'deadline') {
            return (objectItem1[typeSort] < objectItem2[typeSort] ? 1 : -1) * (isReverse ? -1 : 1);
        }
        return false;
    }

    if (typeSort) {
        showSortDirection(isReverse);
        const dataCopy = data.getFilteredOrders().slice();
        dataCopy.sort(compare);
        data.setSortOrders(dataCopy);
        renderOrders(dataCopy);
    }
};

export default sortOrders;
