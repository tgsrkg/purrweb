function clock() {
    const hoursArrow = document.querySelector('.hours');
    const minutesArrow = document.querySelector('.minutes');
    const secondsArrow = document.querySelector('.seconds');

    setInterval(() => {
        const day = new Date();

        if (startBtn.disabled === true) {
            const hours = day.getHours();
            const minutes = day.getMinutes();
            const seconds = day.getSeconds();
            hoursArrow.style.transform = `rotate(${30 * (hours % 12) + 0.5 * minutes}deg)`;
            minutesArrow.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
            secondsArrow.style.transform = `rotate(${6 * seconds}deg)`;
        }
    })
}
clock()

const startBtn = document.querySelector('.startButton');
const pauseBtn = document.querySelector('.pauseButton');

startBtn.disabled = true;
pauseBtn.disabled = false;

startBtn.addEventListener('click', function () {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
});

pauseBtn.addEventListener('click', function () {
    pauseBtn.disabled = true;
    startBtn.disabled = false;
});