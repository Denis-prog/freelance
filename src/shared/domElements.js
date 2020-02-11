class DomElements {
    constructor() {
        this.ordersTable = document.getElementById('orders');
        this.customer = document.getElementById('customer');
        this.freelancer = document.getElementById('freelancer');
        this.blockCustomer = document.getElementById('block-customer');
        this.blockFreelancer = document.getElementById('block-freelancer');
        this.blockChoice = document.getElementById('block-choice');
        this.btnExit = document.getElementById('btn-exit');
        this.formCustomer = document.getElementById('form-customer');
        this.formCustomerAllInputs = this.formCustomer.querySelectorAll('input:not([type="radio"]), textarea');
        this.formCustomerInputTitle = document.getElementById('form-customer-input-title');
        this.formCustomerInputAmount = document.getElementById('amount');
        this.formRadioCurrencyBlock = document.getElementById('radio-currency-block');
        this.ordersTableHead = document.getElementById('table-thead');
        this.tableColumnDeadline = document.getElementById('table-column-deadline');
        this.filterForm = document.getElementById('filter-form');
        this.customerFormBtn = document.getElementById('customer-form-btn');
        this.formInputSectionCurrency = document.getElementById('form-input-section-currency');
        this.filterFormCurrencyRuble = document.getElementById('filter-currency-ruble');
        this.fieldForCurrentResult = document.querySelectorAll('.field-for-current-result');
        this.fieldForValueRuble = document.getElementById('field-for-value-ruble');
        this.fieldForValueBucks = document.getElementById('field-for-value-bucks');
        this.filterFormResetBtn = document.getElementById('filter-form-reset-btn');
        this.filterFormSubmitBtn = document.getElementById('filter-form-submit-btn');
        this.resetSortIndication = document.getElementById('reset-sort-indication');
        this.filterSectionPrice = document.getElementById('filter-section-price');
        this.filterPriceSliderChangeMin = document.getElementById('filter-price-slider-change-min');
        this.filterPriceSliderChangeMax = document.getElementById('filter-price-slider-change-max');
        this.filterPriceSlider = document.getElementById('filter-price-slider');
        this.filterPriceInputMax = document.getElementById('filter-price-input-max');
        this.filterPriceInputMin = document.getElementById('filter-price-input-min');
        this.filterPriceInputsRange = this.filterPriceSlider.querySelectorAll('input[type="range"]');
        this.formInputSectionStatusOrder = document.getElementById('form-input-section-status-order');
        this.inputsSectionStatusOrder = this.formInputSectionStatusOrder.querySelectorAll('input[name="status"]');
        this.formInputDeadline = document.getElementById('deadline');
        this.customerFormBtn = document.getElementById('customer-form-btn');
    }

    validateHtmlElement = (element) => (element && element.length);
}

const domElements = new DomElements();

export default domElements;
