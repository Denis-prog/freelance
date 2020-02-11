import { domElements, CONSTANTS } from '../../shared/index';

const { Repo } = CONSTANTS;

const saveCurrentValueAmountInput = () => {
    Repo.currentValueInputAmount = +domElements.formCustomerInputAmount.value || '';
};

export default saveCurrentValueAmountInput;
