class Activity {
  constructor(activityData, userData) {
    this.activityData = activityData,
    this.userData = userData
  }

  returnMiles(userID, date) {
    const userInfo = this.userData.find(user => user.id === userID)
    const activityEntries = this.activityData.filter(activityEntry => activityEntry.userID === userID);

    const dailyEntry = activityEntries.find(entry => {
      return entry.date === date ;
    });
    return Math.round(userInfo.strideLength * dailyEntry.numSteps / 5280)
  };

  returnMinutesActive(userID, date) {
    // const userInfo = this.userData.find(user => user.id === userID)
    const activityEntries = this.activityData.filter(activityEntry => activityEntry.userID === userID);

    const dailyEntry = activityEntries.find(entry => {
      return entry.date === date ;
    });
    return dailyEntry.minutesActive
  };

  returnMinutesActiveWeek() {

  }

  returnExceededStepGoal() {

  }

  returnClimbingRecord() {

  }

  returnAverages() {
    // stairs climb specified date
    // steps taken specific date
    // minutes active specific date
  }
}

export default Activity
