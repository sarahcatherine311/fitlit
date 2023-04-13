import './css/styles.css';
import { userDataFetch } from './apiCalls';
import User from "../src/data/User.js";
import Hydration from "./data/Hydration.js";
import Sleep from "./data/sleep.js";
import Activity from "../src/data/Activity.js";

let welcomeMessage = document.querySelector("#headerWelcome");
let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userAddress = document.querySelector("#userAddress");
let userStrideLength = document.querySelector("#userSL");
let userDailyStepGoal = document.querySelector("#userDSG");
let stepGoalComparison = document.querySelector("#stepGoalComp");
let dailyWater = document.querySelector("#dailyWater");
let weeklyWater = document.querySelector("#weeklyWater");
let dailySleep = document.querySelector("#dailySleep");
let weeklySleep = document.querySelector("#weeklySleepHours");
let averageSleep = document.querySelector("#averageSleep");
let dailySteps = document.querySelector("#dailySteps");
let dailyMiles = document.querySelector("#dailyMiles");
let dailyMinutes = document.querySelector("#dailyMinutesActive");
let weeklyStepCount = document.querySelector("#weeklyStepCount");
let ouncesInput = document.querySelector("#ouncesInput");
let form = document.querySelector("#form");
let newEntry = document.querySelector('#newEntry');
let calendar = document.querySelector('#calendar');
let calendar2 = document.querySelector('#calendar2');
let activityNote = document.querySelector('#activityNotes')
let activityInput = document.querySelector('#activityInput')
let userNoteBtn = document.querySelector('#userNotes')

let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let newUser, users, hydration, sleep, activity;
let activityNotes = [];

window.addEventListener('load', function () {
  Promise.all([userDataFetch('users'), userDataFetch('hydration'), userDataFetch('sleep'), userDataFetch('activity')])
  .then(data => {
    users = new User (data[0].users);
    hydration = new Hydration(data[1].hydrationData);
    sleep = new Sleep(data[2].sleepData);
    activity = new Activity(data[3].activityData, data[0].users);
    displayUserInfo();
  });
});



function displayUserInfo() {
  generateRandomUser();
  displayWelcomeMessage();
  displayInfoCard();
  displayWaterConsumed();
  displayWeeklyWaterConsumption();
  displayDailySleep();
  displayWeeklySleep();
  displayAverageSleep();
  displayActivity();
  displayWeeklyStepCount();
  displayCalendar();
  displayActivityNote()
};

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`
  calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`
}

function generateRandomUser() {
  newUser = users.getUserData(Math.floor(Math.random() * users.users.length));
};

function displayWelcomeMessage() {
  welcomeMessage.innerText = `Welcome, ${users.getUserFirstName(newUser.id)}!`;
};

function displayInfoCard() {
    userName.innerText = newUser.name;
    userEmail.innerText = newUser.email;
    userAddress.innerText = newUser.address;
    userStrideLength.innerText = `Stride Length: ${newUser.strideLength}`;
    userDailyStepGoal.innerText = `Daily Step Goal: ${newUser.dailyStepGoal}`;
    displayStepGoalComparison();
};

function displayStepGoalComparison() {
    const userStepGoal = newUser.dailyStepGoal;

    if (userStepGoal > users.getAverageStepGoal()) {
        stepGoalComparison.innerText = `Great job!!! Your step goal is above average.  You are KICKING ASS.`;
    } else if (userStepGoal < users.getAverageStepGoal()) {
        stepGoalComparison.innerText = `You can do it!!! Your step goal is below average.  TRY HARDER.`;
    } else {
        stepGoalComparison.innerText = `You are right on track with the average step goal.  Way to be just AVERAGE.`;
    };
};

function displayWaterConsumed() {
  const currentDayEntry = hydration.getDailyOunces(newUser.id, currentDate);

  if (currentDayEntry) {
    dailyWater.innerText = `You have consumed ${currentDayEntry} ounces of water today.`;
  } else {
    dailyWater.innerText = 'Drink more water you thirsty bitch!';
  };
};

function displayWeeklyWaterConsumption() {
  const weeklyWaterEntries = hydration.getWeeklyOunces(newUser.id, currentDate); 
  weeklyWaterEntries.forEach(entry => {
    weeklyWater.innerText += `${entry.date}: ${entry.numOunces}
    `;
  });
};

function displayDailySleep() {
  const currentDayEntry = sleep.getHoursByDay(newUser.id, currentDate);

  if (currentDayEntry) {
    dailySleep.innerText = `You slept ${currentDayEntry} hours last night.`;
  } else {
    dailySleep.innerText = 'You need to get more sleep!';
  };
};

function displayWeeklySleep() {
  const weeklySleepEntries = sleep.getWeekSleep(newUser.id, currentDate);
  weeklySleepEntries.forEach(entry => {
   weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
   `;
  });
};

function displayAverageSleep() {
  averageSleep.innerText += `You average ${sleep.getAvgSleep(newUser.id)} hours of sleep each night and a ${sleep.getAvgQuality(newUser.id)} sleep quality rating!`; 
};

function displayActivity() {
  dailySteps.innerText = `You took ${activity.returnDailySteps(newUser.id, currentDate)} steps today!`;
  dailyMiles.innerText = `You have walked ${activity.returnMiles(newUser.id, currentDate)} miles today!`;
  dailyMinutes.innerText = `You were active for ${activity.returnMinutesActive(newUser.id, currentDate)} minutes today!`;
};

function displayWeeklyStepCount() {
  const weeklyActivityEntries = activity.returnWeeklySteps(newUser.id, currentDate); 
  weeklyActivityEntries.forEach(entry => {
    if(activity.returnMetStepGoal(newUser.id, entry.date)) {
        weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You met your goal.  Take a nap!
        `;
    } else {
        weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You have not met your goal.  STEP IT UP!
        `;
    };
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = {
    "userID": newUser.id, 
    "date": document.getElementById('dateInput').value.split('-').join('/'), 
    "numOunces": ouncesInput.value
  };

  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(json => console.log(json))
  .catch(err => console.log(`Error at: ${err}`))

  displayNewHydrationEntry(data);
  event.target.reset();
})

function displayNewHydrationEntry(data) {
  newEntry.innerText = `Your entry for ${data.date} of ${data.numOunces} ounces drank has been submitted! Good job drankin'!`;
};


userNoteBtn.addEventListener('submit', (event) => {
  event.preventDefault()
  const calendarTwo = document.getElementById('dateInput2').value.split('-').join('/'); 
  const newNote = {userID: newUser.id, date: calendarTwo, activityInput: activityInput.value}
  activityNotes.push(newNote)
  console.log(activityNotes)
  
  localStorage.setItem("activityNotes", JSON.stringify(activityNotes))
  activityNote.innerText = ''
  displayActivityNote()
  activityInput.value = ''
})

function displayActivityNote() {
  activityNotes = JSON.parse(localStorage.getItem("activityNotes")) 
  const userEntries = activityNotes.filter(entry => entry.userID === newUser.id)
  userEntries.forEach(entry => {
    activityNote.innerText += ` ${entry.date}: ${entry.activityInput}

    `
  })
};

//On userNoteBtn add an event listener that incokes a function addUserNote(newUser.id)
// this will push the new object into the activity notes array with the user's id attached
// it will set the local storage equal to the array of activity note objects

// On page load invoke displayActivityNote(newUser.id)
// the function will take in newUser.Id
// it will get the local storage which will be an array of objects of activity notes
// it will filter through the array to find the ones that match the user's id and display those on the DOM
