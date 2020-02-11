import { calcDeadline, declOfNum } from '../services/timerHadler/index';

const getTableRowTemplate = (elem, index) => {
    const {
        id,
        title,
        currency,
        deadline,
        active,
    } = elem;
    const dataForTimer = calcDeadline(deadline);

    if (typeof (dataForTimer) === 'string') {
        return (
            `<tr class="order ${active ? 'taken' : ''}" data-id="${id}">
                    <td>${index + 1}</td>
                    <td>${title}</td>
                    <td class='${currency}'></td>
                    <td class="timer-finish">
                    <span>${dataForTimer}</span>
                    </td>
                </tr>`);
    }
    const [remainingСommon, days, hours] = dataForTimer;
    return (
        `<tr class="order ${active ? 'taken' : ''}" data-id="${id}">
            <td>${index + 1}</td>
            <td>${title}</td>
            <td class='${currency}'></td>
            <td ${remainingСommon < 43200 ? 'class=timer-almost-finish' : ''}
            ${remainingСommon === 0 ? 'class=timer-almost-finish' : ''}>
            ${days ? `<span>${days} ${declOfNum(days, 'days')}</span>` : ''}
            <span>${hours} ${declOfNum(hours, 'hours')}</span>
            </td>
        </tr>`);
};

export default getTableRowTemplate;
