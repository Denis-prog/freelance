const calcDeadline = (date) => {
    const fullDate = `${date}T23:59:59`;
    const deadline = +new Date(fullDate);
    const toDay = new Date();
    const remainingСommon = Math.floor((deadline - toDay) / 1000);

    if (remainingСommon < 0) {
        return 'время вышло';
    }

    const days = Math.floor(remainingСommon / 86400);
    let remainingRest = remainingСommon % 86400;
    const hours = Math.floor(remainingRest / 3600);
    remainingRest %= 3600;
    const minutes = Math.floor(remainingRest / 60);
    const seconds = remainingRest % 60;
    return [remainingСommon, days, hours, minutes, seconds];
};

export default calcDeadline;
