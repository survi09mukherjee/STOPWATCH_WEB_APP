let startTime;
let isRunning = false;
let laps = [];
let interval;

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById('startStop').innerText = 'Start';
  } else {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b, 0) : 0);
    interval = setInterval(updateDisplay, 10);
    document.getElementById('startStop').innerText = 'Stop';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('startStop').innerText = 'Start';
  laps = [];
  document.getElementById('laps').innerHTML = '';
  isRunning = false;
}

function lap() {
  if (isRunning) {
    let lapTime = Date.now() - startTime - (laps.length > 0 ? laps.reduce((a, b) => a + b, 0) : 0);
    laps.push(lapTime);
    let lapItem = document.createElement('li');
    lapItem.innerText = formatTime(lapTime);
    document.getElementById('laps').appendChild(lapItem);
  }
}

function updateDisplay() {
  let currentTime = Date.now() - startTime - (laps.length > 0 ? laps.reduce((a, b) => a + b, 0) : 0);
  document.getElementById('display').innerText = formatTime(currentTime);
}

function formatTime(time) {
  let date = new Date(time);
  let minutes = date.getUTCMinutes().toString().padStart(2, '0');
  let seconds = date.getUTCSeconds().toString().padStart(2, '0');
  let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return ${minutes}:${seconds}:${milliseconds};
}