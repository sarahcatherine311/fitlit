import { expect } from 'chai';
import Activity from '../src/data/Activity';
import activityTestData from './activity-test-data';
import userTestData from './user-test-data';

describe('Activity', function() {
  let activity
  beforeEach(() => {
    activity = new Activity(activityTestData, userTestData);
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  }); 

  // it('should be able to take in a user ID', function() {
  //   expect(activity.userID).to.equal(activityTestData[0].userID);
  // });

  // it('should be able to take in a date', function() {
  //   expect(user1.date).to.equal('2023/03/24');
  // });

  // it('should be able to take in number of steps', function() {
  //   expect(user1.numSteps).to.equal(7362);
  // });

  // it('should be able to take in minutes active', function() {
  //   expect(user1.minutesActive).to.equal(261);
  //   expect(user2.minutesActive).to.equal(125);
  // });

  // it('should be able to take in a users flights of stairs traversed', function() {
  //   expect(user1.flightsOfStairs).to.equal(26)
  // });

  it('should be able to calculate the number of miles walked in a day', function() {
    expect(activity.returnMiles(1, '2023/03/24')).to.equal(6)
  });

  it('should be able to return how many minutes the user was active', function() {
    expect(activity.returnMinutesActive(2, '2023/03/24')).to.equal(125)
  });
});

