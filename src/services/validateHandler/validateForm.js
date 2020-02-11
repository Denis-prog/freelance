import { CONSTANTS, domElements } from '../../shared/index';

const { Repo } = CONSTANTS;

const ValidateOption = {
    title: {
        regExp: [
            /^$/ig, // пустое поле
            /^.{21,}$/ig, // более 20 символов
        ],
        errorValidDescription: [
            'поле не должно быть пустым',
            'поле не может содержать более 20 символов',
        ],
        maxValueLength: 20,
        currentValueLength: null,
        isValid: true,
        indexErrorDescription: null,
    },
    nameCustomer: {
        regExp: [
            /^$/ig, // пустое поле
            /^.{21,}$/ig, // более 20 символов
        ],
        errorValidDescription: [
            'поле не должно быть пустым',
            'поле не может содержать более 20 символов',
        ],
        maxValueLength: 20,
        currentValueLength: null,
        isValid: false,
        indexErrorDescription: 0,
    },
    email: {
        regExp: [
            /^$/ig, // пустое
            /^.*\s+.*/ig, // пробел
            /^[^@]*$/ig, // проверка на наличие собаки
            /^.{0,5}@/ig, // меньше 6 знаков до @
            /^\..*@/ig, // точка первае в названии
            /^.*\.\..*@/ig, // проверка точек подряд в названии
            /^.*[^a-zA-Z0-9.]+.*@/ig, // проверка отличных от точек цифр букв в названии
            /^[0-9][^a-zA-Z]{7,}@/ig, // проверка цифр если общее число больше 8 и отсу-е хотя бы одной буквы
            /.*@[^.]*$/ig, // проверка на точку в домене
            /^.*@.{0,1}\./ig, // проверка на число букв меньше двух в домене
            /^.*@.*(\d+|[^a-zA-Z]).*\./ig, // проверка на отсутствие числа в домене и спец символов в домене
            /\..{0,1}$/ig, // проверка на число букв меньше двух в локали
            /\..*[^a-zA-Z]+/ig, // проверка пристуствия в локали только букв
        ],
        errorValidDescription: [
            'поле не должно быть пустым',
            'email не должен содержать пробелов',
            'отсутствует обязательный символ @',
            'логин не должен быть менее 6 знаков',
            'логин не должен начинаться с точки',
            'в логине не должно быть несколько точек подряд',
            'в логине не должны присутствовать символы кроме латинских букв(a-zA-z), цифр(0-9), точки',
            'если вы используете в своем логине 8 и более знаков, то необходимо присутствие хотя бы одной буквы(a-zA-z)',
            'нет точки в домене',
            'число букв в домене не должно быть менее двух',
            'в домене не должно быть знаков отличных от латинских букв((a-zA-z)',
            'в домене после точки число символов не должно быть меньше двух',
            'в домене после точки должны присутствовать только латинские буквы(a-zA-z)',
        ],
        isValid: false,
        indexErrorDescription: null,
    },
    description: {
        regExp: [
            /^$/ig, // пустое поле
            /^.{500,}$/ig, // более 20 символов
        ],
        errorValidDescription: [
            'поле не должно быть пустым',
            'поле не может содержать более 500 символов',
        ],
        maxValueLength: 500,
        currentValueLength: null,
        isValid: false,
        indexErrorDescription: 0,
    },
    phone: {
        regExp: [
            /^[^+]{1}/ig, // нет плюса в начале
            /^\+{1}.*[^\d]+.*$/ig, // содержание не цифр
            /^.*\s+.*/ig, // пробел
            /.{13,}/ig, // в поле больше 12 символов
            /^.{1,11}$/ig, // в поле меньше 12 символов
            /^.{1}[^7]{1}/ig, // нет семерки после плюса
            /^.{2}[^9]/ig, // после 7ки нет 9ки
            /^.{2}[^9][^\d]{9}/ig, // после 9ки 9 цифр
        ],
        errorValidDescription: [
            'первый символ должен быть "+"',
            'поле не должно содержать другие символы кроме цифр и предшествующего им плюса',
            'поле не должно содержать пробелов',
            'номер не должен состоять из более, чем 12 символов',
            'номер не должен состоять из менее, чем 12 символов',
            'после символа "+" должна следовать цифра "7"',
            'после символа "7" должна следовать цифра "9"',
            'после символа "9" должны следовать 9 цифр',
        ],
        isValid: true,
        indexErrorDescription: null,

    },
    amount: {
        regExp: [
            /^$/ig, // пустое поле
        ],
        errorValidDescription: [
            'сумма должна быть больше нуля',
        ],
        isValid: false,
        indexErrorDescription: 0,
    },
    date: {
        regExp: [
            /^$/ig, // пустое поле
            (value) => { // дата меньше завтрашней
                const dateFromInput = new Date(value.replace(/-/ig, ','));
                return dateFromInput <= new Date();
            },
        ],
        errorValidDescription: [
            'поле не должно быть пустым',
            'выберите минимальную дату из календаря',
        ],
        isValid: false,
        indexErrorDescription: 0,
    },
    common: {
        isStartEnter: true,
    },

};

const setMinDateAttribute = () => {
    const option = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toLocaleDateString('zh-Hans-CN', option)
        .replace(/\//ig, '-');

    domElements.formInputDeadline.setAttribute('min', minDate);
};

const showFillFieldIndicator = (event) => {
    const currentTarget = event.target;
    const currentTargetField = currentTarget.dataset.currentField;

    if (currentTargetField) {
        const { maxValueLength } = ValidateOption[currentTargetField];

        if (Object.prototype.hasOwnProperty.call(ValidateOption, `${currentTargetField}`)
            && maxValueLength) {
            const currentFieldIndicator = currentTarget.parentNode.previousElementSibling;
            ValidateOption[currentTargetField].currentValueLength = currentTarget
                .value.trim().length;
            const { currentValueLength } = ValidateOption[currentTargetField];
            const OnePercent = 100 / maxValueLength;

            if (ValidateOption.common.isStartEnter) {
                currentFieldIndicator.classList.add('display-block');
                ValidateOption.common.isStartEnter = false;
            }

            if (currentValueLength > maxValueLength) {
                currentFieldIndicator.style.backgroundImage = 'none';
                currentFieldIndicator.style.backgroundColor = 'red';
                return;
            }

            currentFieldIndicator.style.backgroundImage = `linear-gradient(to right,
            #008000 0%,
            #008000 ${100 - currentValueLength * OnePercent}%,
            #fff ${100 - currentValueLength * OnePercent}%,
            #fff 100%)`;
        }
    }
};

const setDefaultValidateSettings = (event) => {
    const currentTarget = event.target;
    const currentTargetField = currentTarget.dataset.currentField;

    if (Object.prototype.hasOwnProperty.call(ValidateOption, `${currentTargetField}`)
        && ValidateOption[currentTargetField].maxValueLength) {
        const currentFieldIndicator = currentTarget.parentNode.previousElementSibling;
        currentFieldIndicator.classList.remove('display-block');
        ValidateOption.common.isStartEnter = true;
    }
};

const clearIndicationAboutValidation = (event) => {
    const currentTarget = event.target;
    const currentTargetField = currentTarget.dataset.currentField;

    if (Object.prototype.hasOwnProperty.call(ValidateOption, `${currentTargetField}`)) {
        const parentElement = currentTarget.parentNode;
        parentElement.classList.remove('validate-parent-input-succes');
        currentTarget.classList.remove('validate-input-error');
        parentElement.classList.remove('validate-input-error-show-description');
        currentTarget.classList.remove('validate-input-succes');
    }
};

const clearAllIndicationAboutValidationAfterSubmit = () => {
    [...domElements.formCustomerAllInputs].forEach((item) => {
        item.parentNode.classList.remove('validate-parent-input-succes');
        item.classList.remove('validate-input-succes');
    });

    Object.keys(ValidateOption).forEach((item) => {
        if (item !== 'common' && item !== 'phone') {
            ValidateOption[item].isValid = false;
        }
    });

    domElements.customerFormBtn.setAttribute('disabled', 'disabled');
};

const checkInputForRegExp = (event) => {
    const currentTarget = event.target;
    const currentTargetField = currentTarget.dataset.currentField;
    const { isDump } = currentTarget.dataset;

    if (Object.prototype.hasOwnProperty.call(ValidateOption, `${currentTargetField}`)
        && currentTargetField
        && ValidateOption[currentTargetField].regExp) {
        const parentElement = currentTarget.parentNode;
        const currentRegExpressions = ValidateOption[currentTargetField].regExp;
        const currentValue = isDump
            ? Repo.currentValueInputAmount
            : currentTarget.value.trim();

        const isValid = currentRegExpressions.some((item, index) => {
            if (typeof item === 'function') {
                ValidateOption[currentTargetField].indexErrorDescription = index;
                return item(currentValue);
            }

            const currentRegExp = new RegExp(item);

            if (currentRegExp.test(currentValue)) {
                ValidateOption[currentTargetField].indexErrorDescription = index;
                return true;
            }
            return false;
        });

        if (!isValid) {
            parentElement.classList.add('validate-parent-input-succes');
            currentTarget.classList.add('validate-input-succes');
            ValidateOption[currentTargetField].isValid = true;
        } else {
            currentTarget.classList.add('validate-input-error');
            parentElement.classList.add('validate-input-error-show-description');
            ValidateOption[currentTargetField].isValid = false;
        }
    }
};

const showDescriptionErrorValid = (event) => {
    const currentTarget = event.target;
    const currentTargetField = currentTarget.dataset.currentField;

    if (currentTargetField) {
        const currentErrorIndexErrorDescription = ValidateOption[currentTargetField]
            .indexErrorDescription;

        if (Object.prototype.hasOwnProperty.call(ValidateOption, `${currentTargetField}`)
            && currentTargetField
            && ValidateOption[currentTargetField].errorValidDescription
            && Number.isInteger(currentErrorIndexErrorDescription)) {
            const parentElement = currentTarget.parentNode;
            const currentErrorText = ValidateOption[currentTargetField]
                .errorValidDescription[currentErrorIndexErrorDescription];
            parentElement.dataset.errorText = currentErrorText;
        }
    }
};

const generalValidation = () => {
    const isValid = Object.keys(ValidateOption)
        .filter((item) => item !== 'common')
        .every((item) => ValidateOption[item].isValid);

    // eslint-disable-next-line no-unused-expressions
    isValid
        ? domElements.customerFormBtn.removeAttribute('disabled')
        : domElements.customerFormBtn.setAttribute('disabled', 'disabled');
};

export {
    showFillFieldIndicator,
    setDefaultValidateSettings,
    clearIndicationAboutValidation,
    clearAllIndicationAboutValidationAfterSubmit,
    checkInputForRegExp,
    showDescriptionErrorValid,
    setMinDateAttribute,
    generalValidation,
};
