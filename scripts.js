let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    // sometimes setInterval just doesn"t work if running continuously, esp with IOS scrolling
    
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now(); //Date.now is the number of milliseconds since Jan 1, 1970
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`; // to get the zero before seconds that are less than 10, so 2:04 instead of 2:4
    document.title = display; // displays the timer on the page tab if users want to say check their email on the break
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour -12 : hour; // Otherwise this will show in military time
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${adjustedHour}:${minutes< 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

// If your HTML element has a name, you can just call document.[NAME], and if nested elements also have names, you can call them like document.[NAME].[NAME]. So in below, you call call document.customForm and also document.customForm.minutes
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset(); //to clear the box
});