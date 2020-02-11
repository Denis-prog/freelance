import { domElements, CONSTANTS } from '../../shared/index';

const { Repo } = CONSTANTS;

const setCurrentValueInputAmount = () => {
    domElements.formCustomerInputAmount.value = Repo.currentValueInputAmount;
};

export default setCurrentValueInputAmount;
