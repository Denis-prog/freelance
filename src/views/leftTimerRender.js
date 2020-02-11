import { calcDeadline, declOfNum } from '../services/timerHadler/index';
import { CONSTANTS } from '../shared/index';

const { State } = CONSTANTS;

const leftTimerRender = (data, fieldsForTimer) => {
    setTimeout(function timer() {
        if (!State.isModalWindowOrdersOpen) {
            return;
        }

        const dateFragments = calcDeadline(data);

        if (typeof (dateFragments) === 'string') {
            const fields = fieldsForTimer;
            fields[0].textContent = dateFragments;
            for (let i = 1; i < fieldsForTimer.length; i += 1) {
                fields[i].textContent = '';
            }
            return;
        }
        dateFragments.splice(0, 1);
        fieldsForTimer.forEach((element, index) => {
            const nameField = ['days', 'hours', 'minutes', 'seconds'];
            const currentElement = element;
            currentElement.textContent = `${dateFragments[index]} ${declOfNum(dateFragments[index], nameField[index])}`;
        });
        setTimeout(timer, 1000);
    }, 1000);
};

export default leftTimerRender;
