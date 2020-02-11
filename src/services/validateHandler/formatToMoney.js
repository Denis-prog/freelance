const formatToMoney = (price, locales, currencyType) => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currencyType,
    });
    const format = formatter.format(price);
    return format;
};

export default formatToMoney;
