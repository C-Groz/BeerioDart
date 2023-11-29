var stopwatch;
var beepSound = new Audio('3-2-1-go.mp3'); // Replace '3-2-1-go.mp3' with the path to your beep sound file
var isTimerRunning = false;

function startTimer(chuggingDuration) {
  document.getElementById('timer').innerText = 'Get ready...';

  // Start the beep sound after a delay 
  setTimeout(function () {
    beepSound.play();

    // Start the chugging timer after a delay of 8 seconds (adjust as needed)
    setTimeout(function () {
      var seconds = chuggingDuration;
      stopwatch = setInterval(function () {
        document.getElementById('timer').innerText = seconds.toFixed(1) + ' seconds remaining';
        if (seconds <= 0) {
          clearInterval(stopwatch);
          document.getElementById('timer').innerText = 'Chugging time is over!';
            stopBeepSound();
	    restartTimer();
        }
        seconds -= 0.1;
      }, 100); // Decreased the interval to 100 milliseconds for 0.1 second precision
    }, 8700); // Adjust the delay before starting the chugging timer (in milliseconds)
  },); // Adjust the delay before starting the beep sound (in milliseconds)
}

function startChuggingTimer(chuggingDuration) {
  var seconds = chuggingDuration;
  stopwatch = setInterval(function () {
    document.getElementById('timer').innerText = seconds.toFixed(1) + ' seconds remaining';
    if (seconds <= 0) {
      clearInterval(stopwatch);
      document.getElementById('timer').innerText = 'Chugging time is over!';
	stopBeepSound();
    }
    seconds -= 0.1;
  }, 100); // Decreased the interval to 100 milliseconds for 0.1 second precision
}

function stopBeepSound() {
  beepSound.pause();
  beepSound.currentTime = 0; // Reset the sound to the beginning
}

function restartTimer() {
  clearInterval(stopwatch);
  isTimerRunning = false;
  document.getElementById('timer').innerText = '';

  // Reset input fields
  document.getElementById('team1').value = '';
  document.getElementById('team2').value = '';

  // Reset result display
  document.getElementById('result').innerText = '';

  // Disable "Start Timer" button if it exists
  var startTimerButton = document.getElementById('startTimerButton');
  if (startTimerButton) {
    startTimerButton.disabled = false;
  }

  // Remove the "Start Timer" button if it exists
  if (startTimerButton && startTimerButton.parentNode) {
    startTimerButton.parentNode.removeChild(startTimerButton);
  }

  // Remove the "Restart Timer" button
  var restartTimerButton = document.getElementById('restartTimerButton');
  if (restartTimerButton && restartTimerButton.parentNode) {
    restartTimerButton.parentNode.removeChild(restartTimerButton);
  }
}

function calculateDifference() {
  if (isTimerRunning) {
    return;
  }

  // Remove existing buttons and timer elements
  var existingStartTimerButton = document.getElementById('startTimerButton');
  if (existingStartTimerButton) {
    existingStartTimerButton.parentNode.removeChild(existingStartTimerButton);
  }

  var existingRestartTimerButton = document.getElementById('restartTimerButton');
  if (existingRestartTimerButton) {
    existingRestartTimerButton.parentNode.removeChild(existingRestartTimerButton);
  }

  var existingTimerDiv = document.getElementById('timer');
  if (existingTimerDiv) {
    existingTimerDiv.parentNode.removeChild(existingTimerDiv);
  }

  // Get the input values
  var team1Score = document.getElementById('team1').value;
  var team2Score = document.getElementById('team2').value;

  // Validate input (check if the input is a number)
  if (isNaN(team1Score) || isNaN(team2Score)) {
    alert('Please enter valid numeric scores for both teams.');
    return;
  }

  // Determine the team with more points
  var winningTeam;
  if (team1Score > team2Score) {
    winningTeam = "Team 1";
  } else if (team1Score < team2Score) {
    winningTeam = "Team 2";
  } else {
    // If scores are equal, no need to chug
    document.getElementById('result').innerText = 'Scores are equal. No need to chug.';
    return;
  }

  // Calculate the chugging duration based on the absolute difference
  var difference = Math.abs(team1Score - team2Score);

  // Check if the difference is less than one second
  if (difference < 1) {
    document.getElementById('result').innerText = 'The difference is less than one second. No need to chug.';
    return;
  }

  var chuggingDuration = difference / 10; // Adjust as needed

  // Display the result
  document.getElementById('result').innerText = winningTeam + ' chugs for ' + chuggingDuration + ' seconds!';

  // Display the "Start Timer" button
  var startTimerButton = document.createElement('button');
  startTimerButton.id = 'startTimerButton';
  startTimerButton.innerText = 'Start Timer';
  startTimerButton.onclick = function () {
    if (!isTimerRunning) {
      startTimer(chuggingDuration);
      startTimerButton.disabled = true;
      isTimerRunning = true;
    }
  };
  document.body.appendChild(startTimerButton);

  // Display the "Restart Timer" button
  var restartTimerButton = document.createElement('button');
  restartTimerButton.id = 'restartTimerButton';
  restartTimerButton.innerText = 'Restart Timer';
  restartTimerButton.onclick = function () {
    restartTimer();
  };
  document.body.appendChild(restartTimerButton);

  // Display a div for the timer
  var timerDiv = document.createElement('div');
  timerDiv.id = 'timer';
  document.body.appendChild(timerDiv);
}
