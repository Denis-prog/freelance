const declOfNum = (number, titles) => {
    if (!declOfNum.cache) {
        declOfNum.cache = {};
    }

    const nameTemplates = {
        days: ['день', 'дня', 'дней'],
        hours: ['час', 'часа', 'часов'],
        minutes: ['минута', 'минуты', 'минут'],
        seconds: ['секунда', 'секунды', 'секунд'],
    };

    if (declOfNum.cache[number] !== undefined) {
        const indexFromCache = declOfNum.cache[number];

        return nameTemplates[titles][indexFromCache];
    }

    const index = (number % 100 > 4 && number % 100 < 20)
        ? 2
        : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5];

    declOfNum.cache[number] = index;

    return nameTemplates[titles][index];
};

export default declOfNum;
