// Select input fields and play button
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const playButton = document.getElementById('play-button');
const contentWrapper = document.querySelector('.content-wrapper');

// Variables to hold timer values and interval
let totalTimeInSeconds = 0;
let countdownInterval;

// Function to start the countdown timer
function startTimer() {
    // Get values from input fields and convert to seconds
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // Calculate total time in seconds
    totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

    // If total time is 0, prevent starting the timer
    if (totalTimeInSeconds <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Disable inputs and button to prevent further changes
    disableInputs();

    // Start countdown
    countdownInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer every second
function updateTimer() {
    if (totalTimeInSeconds <= 0) {
        clearInterval(countdownInterval);
        alert("Time's up!");

        // Add bouncing and blinking border effect
        contentWrapper.classList.add('timer-done');

        // Keep the play button hidden when timer hits zero
        playButton.classList.add('hide');

        // Enable inputs after timer ends
        enableInputs();
        return;
    }

    totalTimeInSeconds--;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    // Update input fields
    hoursInput.value = String(hours).padStart(2, '0');
    minutesInput.value = String(minutes).padStart(2, '0');
    secondsInput.value = String(seconds).padStart(2, '0');
}

// Function to disable inputs and button
function disableInputs() {
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    playButton.classList.add('hide'); // Hide play button
}

// Function to enable inputs and button
function enableInputs() {
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
}

// Function to check if any input field has a value
function checkInput() {
    const hours = hoursInput.value;
    const minutes = minutesInput.value;
    const seconds = secondsInput.value;

    // If new input is made, stop the bounce and show the play button
    if (hours || minutes || seconds) {
        contentWrapper.classList.remove('timer-done'); // Stop the bouncing
        playButton.classList.remove('hide'); // Show play button
    } else {
        playButton.classList.add('hide');
    }
}

// Stop bouncing when clicking on input fields
function stopBounce() {
    contentWrapper.classList.remove('timer-done'); // Removes bounce animation class
}

// Event listeners for input fields
hoursInput.addEventListener('input', checkInput);
minutesInput.addEventListener('input', checkInput);
secondsInput.addEventListener('input', checkInput);

// Stop bouncing animation when input fields are clicked
hoursInput.addEventListener('click', stopBounce);
minutesInput.addEventListener('click', stopBounce);
secondsInput.addEventListener('click', stopBounce);

// Event listener for the play button
playButton.addEventListener('click', startTimer);
