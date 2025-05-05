let currentTab = "classic";
let timers = {
    classic: { minutes: 25, seconds: 0, interval: null },
    break: { minutes: 5, seconds: 0, interval: null }
};

function updateDisplay() {
    const timer = timers[currentTab];
    const timerEl = document.getElementById(`${currentTab}-timer`);
    timerEl.innerHTML = `${timer.minutes.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(2, '0')}`;
}

function displayTimer(tab) {
    const timer = timers[tab];
    if (timer.seconds === 0) {
        if (timer.minutes === 0) {
            clearInterval(timer.interval);
            timer.interval = null;
            return;
        }
        timer.minutes--;
        timer.seconds = 59;
    } else {
        timer.seconds--;
    }
    if (tab === currentTab) updateDisplay();
}

// Tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        document.getElementById(btn.dataset.tab).classList.add("active");

        currentTab = btn.dataset.tab;
        updateDisplay();
    });
});

// Button actions
["classic", "break"].forEach(tab => {
    document.getElementById(`${tab}-start`).addEventListener("click", () => {
        const timer = timers[tab];
        if (timer.interval === null) {
            timer.interval = setInterval(() => displayTimer(tab), 1000);
        }
    });

    document.getElementById(`${tab}-stop`).addEventListener("click", () => {
        const timer = timers[tab];
        clearInterval(timer.interval);
        timer.interval = null;
    });

    document.getElementById(`${tab}-reset`).addEventListener("click", () => {
        const timer = timers[tab];
        clearInterval(timer.interval);
        timer.interval = null;
        timer.minutes = tab === "classic" ? 25 : 5;
        timer.seconds = 0;
        if (tab === currentTab) updateDisplay();
    });
});