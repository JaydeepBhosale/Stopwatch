let startTime = 0;
let updatedTime = 0;
let interval;
let isRunning = false;

// Function to format time
function formatTime(time) {
  return time.toString().padStart(2, '0');
}

// Start stopwatch function
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - updatedTime;
    interval = setInterval(updateTime, 10);
  }
}

// Stop stopwatch function
function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
    checkAndStoreRecord();
  }
}

// Reset stopwatch function
function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  startTime = 0;
  updatedTime = 0;
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("milliseconds").textContent = "000";
}

// Update stopwatch display
function updateTime() {
  updatedTime = Date.now() - startTime;
  
  let milliseconds = updatedTime % 1000;
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
  document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, '0');
}

// Store and display previous record
function checkAndStoreRecord() {
  const prevRecord = localStorage.getItem("previousRecord");
  const currentTime = `${formatTime(Math.floor((updatedTime / (1000 * 60 * 60)) % 24))}:${formatTime(Math.floor((updatedTime / (1000 * 60)) % 60))}:${formatTime(Math.floor((updatedTime / 1000) % 60))}.${updatedTime % 1000}`;

  if (!prevRecord || updatedTime < parseInt(prevRecord)) {
    localStorage.setItem("previousRecord", updatedTime);
    document.getElementById("prev-record-display").textContent = currentTime;
  }
}

// Display previous record on load
function displayPreviousRecord() {
  const prevRecord = localStorage.getItem("previousRecord");
  if (prevRecord) {
    const milliseconds = prevRecord % 1000;
    const seconds = Math.floor((prevRecord / 1000) % 60);
    const minutes = Math.floor((prevRecord / (1000 * 60)) % 60);
    const hours = Math.floor((prevRecord / (1000 * 60 * 60)) % 24);
    document.getElementById("prev-record-display").textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${milliseconds.toString().padStart(3, '0')}`;
  }
}

// Run on page load
displayPreviousRecord();
