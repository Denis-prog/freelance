import formatToMoney from './formatToMoney';
import { domElements, CONSTANTS } from '../../shared/index';

const { Repo } = CONSTANTS;

const formatValueInputAmount = () => {
    const currentRadioCurrencyChecked = document.querySelector('input[name="currency"]:checked');
    const localeParameter = currentRadioCurrencyChecked.getAttribute('data-locale-parameter');
    const currencyParameter = currentRadioCurrencyChecked.getAttribute('data-currency-parameter');
    domElements.formCustomerInputAmount.value = `${formatToMoney(Repo.currentValueInputAmount,
        localeParameter, currencyParameter)}`;
};

export default formatValueInputAmount;
