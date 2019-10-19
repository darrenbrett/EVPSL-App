"use strict";

const genName = require("./../names/gen_names");
const Player = require("./../../api/players/model");
const PlayerCtlr = require("./../../api/players/controller");

// generator player speed (6 - 10)
const genSpeed = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player ball handling ability
const genBallHandling = () => {
  const min = 5;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player soccer smarts
const genSoccerIntelligence = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player strength
const genStrength = () => {
  const min = 5;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player height and weight
const genHeightAndWeight = async () => {
  let initialHeight;
  let height;
  let weight;
  const min = 57;
  const max = 64;
  initialHeight = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log('initialHeight: ', initialHeight);

  // TODO: Add some variability above and below for outliers
  let happenStance = await Math.floor(Math.random() * 2) == 0;
  console.log('happenStance: ', happenStance);
  // console.log('initialHeight: ', initialHeight);
  if (initialHeight == 59) {
    if (happenStance) {
      initialHeight = initialHeight + 2;
      console.log('upper height adj: ', initialHeight);
    }
  }
  if (initialHeight > 62) {
    if (happenStance) {
      initialHeight = initialHeight - 2;
      console.log('upper height adj: ', initialHeight);
    }
  }
  if (initialHeight <= 58) {
    if (happenStance) {
      initialHeight = initialHeight + 2;
    }
  }

  height = initialHeight;
  // console.log('height: ', height);
  weight = height * 32 / 10 - 4;
  height = height / 10;

  return {
    height,
    weight
  };
};

const genAge = () => {
  const min = 18;
  const max = 30;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate mental fortitude
const genMentalFortitude = () => {
  const min = 7;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate physicial fortitude
const genPhysicalFortitude = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genProfileAverage = (speed, ballHandling, soccerIntelligence, strength, mentalFortitude, physicalFortitude) => {
  let score = speed + ballHandling + soccerIntelligence + strength + mentalFortitude + physicalFortitude;
  return score / 60 * 10;
};

const genPlayerProfile = async () => {
  const speed = await genSpeed();
  const ballHandling = await genBallHandling();
  const age = await genAge();
  const soccerIntelligence = await genSoccerIntelligence();
  const strength = await genStrength();
  const mentalFortitude = await genMentalFortitude();
  const physicalFortitude = await genPhysicalFortitude();
  const size = await genHeightAndWeight();
  const firstName = await genName.getRandomFirstName();
  const lastName = await genName.getRandomLastName();
  const overallScore = await genProfileAverage(speed, ballHandling, soccerIntelligence, strength, mentalFortitude, physicalFortitude);
  const aggScore = await parseFloat(overallScore.toFixed(2));
  const currentTeam = "Sanviago";

  let playerProfile = {
    name: {
      first: firstName,
      last: lastName
    },
    speed,
    age,
    ballHandling,
    soccerIntelligence,
    strength,
    height: size.height,
    weight: size.weight,
    mentalFortitude,
    physicalFortitude,
    aggScore,
    currentTeam
  };

  let formattedPlayer = JSON.stringify(playerProfile);

  console.log('formattedPlayer: ', formattedPlayer);

  try {
    let createdPlayer = await PlayerCtlr.add({
      name: {
        first: firstName,
        last: lastName
      },
      speed,
      age,
      ballHandling,
      soccerIntelligence,
      strength,
      height: size.height,
      weight: size.weight,
      mentalFortitude,
      physicalFortitude,
      aggScore,
      currentTeam
    });
  } catch (error) {
    console.log(error);
  }
};

genPlayerProfile();

module.exports = {
  genPlayerProfile
};
