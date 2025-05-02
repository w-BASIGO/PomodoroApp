let [minutes, seconds] = [25, 0];
let timerRef = document.querySelector(".timer");
let int = null;

document.getElementById("start").addEventListener("click", () => {
    if (int === null) {
        int = setInterval(displayTimer, 1000);
    }
});

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(int);
    int = null;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(int);
    int = null;
    [minutes, seconds] = [25, 0];
    timerRef.innerHTML = "25:00";
});

function displayTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(int);
            int = null;
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timerRef.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}