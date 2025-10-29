// DOM
const clockDisplay = document.getElementById("clockDisplay");
const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const lapList = document.getElementById("lapList");
const alarmSection = document.getElementById("alarmSection");
const alarmList = document.getElementById("alarmList");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const stopwatchButtons = document.getElementById("stopwatchButtons");

let alarms = [];
let swRunning = false;
let swStart = 0;
let swElapsed = 0;
let swInterval;

// 時計
setInterval(() => {
  const now = new Date();
  clockDisplay.textContent =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
  checkAlarms();
}, 200);

// ボタン選択表示
function switchMode(mode) {
  document.querySelectorAll(".controls button").forEach(btn => btn.classList.remove("active"));
  if (mode === "clock") {
    clockBtn.classList.add("active");
    clockDisplay.style.display = "block";
    stopwatchDisplay.style.display = "none";
    lapList.style.display = "none";
    stopwatchButtons.style.display = "none";
    alarmSection.style.display = "none";
  } else if (mode === "stopwatch") {
    stopwatchBtn.classList.add("active");
    stopwatchDisplay.style.display = "block";
    lapList.style.display = "block";
    stopwatchButtons.style.display = "block";
    clockDisplay.style.display = "none";
    alarmSection.style.display = "none";
  } else if (mode === "alarm") {
    alarmBtn.classList.add("active");
    alarmSection.style.display = "block";
    clockDisplay.style.display = "none";
    stopwatchDisplay.style.display = "none";
    stopwatchButtons.style.display = "none";
    lapList.style.display = "none";
  }
}

// ストップウォッチ動作
startStopBtn.addEventListener("click", () => {
  if (!swRunning) {
    swRunning = true;
    startStopBtn.textContent = "ストップ";
    swStart = Date.now() - swElapsed;
    swInterval = setInterval(() => {
      swElapsed = Date.now() - swStart;
      const ms = Math.floor((swElapsed % 1000) / 100);
      const sec = Math.floor(swElapsed / 1000) % 60;
      const min = Math.floor(swElapsed / 1000 / 60);
      stopwatchDisplay.textContent =
        `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${ms}`;
    }, 100);
  } else {
    swRunning = false;
    startStopBtn.textContent = "スタート";
    clearInterval(swInterval);
  }
});

lapBtn.addEventListener("click", () => {
  const li = document.createElement("div");
  li.textContent = stopwatchDisplay.textContent;
  lapList.prepend(li);
});

resetBtn.addEventListener("click", () => {
  swRunning = false;
  clearInterval(swInterval);
  swElapsed = 0;
  stopwatchDisplay.textContent = "00:00.0";
  startStopBtn.textContent = "スタート";
  lapList.innerHTML = "";
});

// アラーム追加
addAlarmBtn.addEventListener("click", () => {
  const now = new Date();
  const time =
    `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  alarms.push({ time, active: true });
  renderAlarms();
});

// ON/OFF
function toggleAlarm(i) {
  alarms[i].active = !alarms[i].active;
  renderAlarms();
}

// アラーム表示更新
function renderAlarms() {
  alarmList.innerHTML = "";
  alarms.forEach((alarm, i) => {
    const li = document.createElement("li");
    li.className = "alarm-item";
    li.innerHTML = `
      <span>${alarm.time}</span>
      <div class="switch ${alarm.active ? "on" : ""}" onclick="toggleAlarm(${i})">
        <div class="switch-circle"></div>
      </div>`;
    alarmList.appendChild(li);
  });
}

// アラーム発動
function checkAlarms() {
  const now = new Date();
  const currentTime =
    `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  alarms.forEach(a => {
    if (a.active && a.time === currentTime) {
      alert("アラーム！");
      a.active = false;
      renderAlarms();
    }
  });
}

// UIモード切替
clockBtn.onclick = () => switchMode("clock");
stopwatchBtn.onclick = () => switchMode("stopwatch");
alarmBtn.onclick = () => switchMode("alarm");
switchMode("clock");
