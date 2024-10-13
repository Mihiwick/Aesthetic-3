let timer;
let isRunning = false;
let workTime = 25;
let breakTime = 5;
let isWorkPeriod = true;

const clockDisplay = document.getElementById("clock");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const workInput = document.getElementById("workTime");
const breakInput = document.getElementById("breakTime");
const musicSelection = document.getElementById("musicSelection");
const audioPlayer = document.getElementById("audioPlayer");

startStopBtn.addEventListener("click", function() {
    if (!isRunning) {
        startTimer();
        startStopBtn.textContent = "Pause";
    } else {
        pauseTimer();
        startStopBtn.textContent = "Start";
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener("click", resetTimer);

function startTimer() {
    timer = setInterval(countdown, 1000);
    workTime = parseInt(workInput.value);
    breakTime = parseInt(breakInput.value);
}

function pauseTimer() {
    clearInterval(timer);
}

function countdown() {
    let timeArray = clockDisplay.textContent.split(":");
    let minutes = parseInt(timeArray[0]);
    let seconds = parseInt(timeArray[1]);

    if (seconds === 0 && minutes === 0) {
        clearInterval(timer);
        if (isWorkPeriod) {
            minutes = breakTime;
        } else {
            minutes = workTime;
        }
        isWorkPeriod = !isWorkPeriod;
        startTimer();
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    clockDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function resetTimer() {
    clearInterval(timer);
    clockDisplay.textContent = "25:00";
    isRunning = false;
    isWorkPeriod = true;
    startStopBtn.textContent = "Start";
}

musicSelection.addEventListener("change", function() {
    let selectedMusic = musicSelection.value;
    if (selectedMusic === "none") {
        audioPlayer.pause();
        audioPlayer.style.display = "none";
    } else {
        audioPlayer.style.display = "block";
        let musicSource = "";
        if (selectedMusic === "classical") {
            musicSource = "path_to_classical_music.mp3";
        } else if (selectedMusic === "lofi") {
            musicSource = "path_to_lofi_music.mp3";
        } else if (selectedMusic === "rain") {
            musicSource = "path_to_rain_sounds.mp3";
        }
        audioPlayer.src = musicSource;
        audioPlayer.play();
    }
});
