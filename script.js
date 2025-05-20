document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('lapsContainer');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let lapCount = 1;

    // Format time as HH:MM:SS.mm
    function formatTime(time) {
        const date = new Date(time);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    // Update the display
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    // Start the stopwatch
    function start() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }

    // Pause the stopwatch
    function pause() {
        clearInterval(timerInterval);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        lapBtn.disabled = true;
        lapCount = 1;
        lapsContainer.innerHTML = '';
    }

    // Record a lap time
    function lap() {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        // Add new lap at the top
        if (lapsContainer.firstChild) {
            lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
        } else {
            lapsContainer.appendChild(lapItem);
        }
        
        lapCount++;
    }

    // Event listeners
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
});