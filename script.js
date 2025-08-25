// Tab Navigation
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabId).classList.remove('hidden');

    document.querySelectorAll('.sidebar nav button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Rotierende Header-Texte (STATUS / SHIFT / PROJECT)
const headerText = document.getElementById('header-text');
const titles = ["STATUS", "SHIFT", "PROJECT"];
let titleIndex = 0;
function rotateHeader() {
    headerText.style.opacity = 0;
    setTimeout(() => {
        headerText.textContent = titles[titleIndex];
        headerText.style.opacity = 1;
        titleIndex = (titleIndex + 1) % titles.length;
    }, 500);
}
setInterval(rotateHeader, 3000);

// Status Cards laden
function loadStatus() {
    const statusContainer = document.getElementById('status-container');
    const systems = [
        { name: 'GREDDO | Germany', status: 'ONLINE', color: 'green', tag: 'GAME' },
        { name: 'GREDDO Support Bot', status: 'ISSUE', color: 'yellow', tag: 'BOT' },
        { name: 'GREDDO Administration', status: 'ISSUE', color: 'yellow', tag: 'BOT' }
    ];

    statusContainer.innerHTML = ''; // clear old content

    systems.forEach(system => {
        const div = document.createElement('div');
        div.className = 'status-card';
        div.innerHTML = `
            <div class="status-info">
                <span class="status-dot ${system.color}"></span>
                <strong>${system.name}</strong>
            </div>
            <div>
                <span>${system.status}</span>
                <span class="tag">${system.tag}</span>
            </div>
        `;
        statusContainer.appendChild(div);
    });
}

// Shift Countdown
function initShiftCountdown() {
    const shiftTimeStart = 21; // 21:00
    const shiftTimeEnd = 22;   // 22:00
    const shiftStatus = document.getElementById('shift-status');
    const shiftCountdown = document.getElementById('shift-countdown');

    function updateShift() {
        const now = new Date();
        const start = new Date();
        const end = new Date();
        start.setHours(shiftTimeStart, 0, 0, 0);
        end.setHours(shiftTimeEnd, 0, 0, 0);

        if (now < start) {
            let diff = (start - now) / 1000;
            if (diff <= 600) { // less than 10 minutes
                shiftStatus.textContent = "Starting Soon";
            } else {
                shiftStatus.textContent = "Upcoming";
            }
            shiftCountdown.textContent = formatTime(diff);
        } else if (now >= start && now < end) {
            shiftStatus.textContent = "In Progress";
            let diff = (end - now) / 1000;
            shiftCountdown.textContent = formatTime(diff);
        } else {
            shiftStatus.textContent = "Shift has ended";
            shiftCountdown.textContent = "";
        }
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    }

    updateShift();
    setInterval(updateShift, 1000);
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    loadStatus();
    initShiftCountdown();
    rotateHeader();
});









