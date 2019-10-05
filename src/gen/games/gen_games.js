'use strict';

const teamStrengths = require("./../data/team_strengths.json");

function getGoalsScored() {
  let min = Math.ceil(0);
  // max = Math.floor(2);
  let max = 1.5;
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function getHomeXFactor() {
  let min = Math.ceil(0);
  let max = Math.floor(10);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// function getAwayXFactor() {
//   min = Math.ceil(0);
//   max = Math.floor(10);
//   return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
// }

let draws = 0;
let scorelessDraws = 0;
let homeTeamWins = 0;
let awayTeamWins = 0;

function genScore(awayTeam, homeTeam) {
  let homeTeamRating;
  let awayTeamRating;
  // loop through and get homeTeam and awayTeam ratings
  for (let teamStrength of teamStrengths) {
    if (teamStrength.name === homeTeam) {
      homeTeamRating = teamStrength.rating;
      console.log("home strength: ", homeTeam, homeTeamRating);
    }
    if (teamStrength.name === awayTeam) {
      awayTeamRating = teamStrength.rating;
      console.log("away strength: ", awayTeam, awayTeamRating);
    }
  }

  // Get initial home team goals
  let homeTeamInitResult = getGoalsScored();
  console.log('homeTeamInitResult: ', homeTeamInitResult);

  // Add in home field advantage
  homeTeamInitResult = homeTeamInitResult + 0.35;
  console.log('homeTeamInitResult after advantage added: ', homeTeamInitResult);

  // Get intial away team goals
  let awayTeamInitResult = getGoalsScored();
  console.log('awayTeamResult: ', awayTeamInitResult);

  // Calculate mod by strength rating
  let homeResultModByStrength = (homeTeamInitResult * homeTeamRating * 0.7) / 10;
  let awayResultModByStrength = (awayTeamInitResult * awayTeamRating * 0.7) / 10;

  // Calculate scores moderated by strength
  let awayModScore = awayTeamInitResult + awayResultModByStrength;
  console.log("awayModScore: ", awayModScore);
  let homeModScore = homeTeamInitResult + homeResultModByStrength;
  console.log("homeModScore: ", homeModScore);

  // Round scores to nearest integer
  let finalHomeScore = Math.round(homeModScore);
  let finalAwayScore = Math.round(awayModScore);

  let homeXFactor = getHomeXFactor();
  if (homeXFactor >= 9) {
    finalHomeScore = finalHomeScore + 1;
  } else if (homeXFactor > 10) {
    finalHomeScore = finalHomeScore + 2;
  } else if (homeXFactor == 7) {
    finalHomeScore = 0;
  }

  // Add in x factors for both teams to gen 0 - 0 scores
  let awayXFactor = getHomeXFactor();
  if (awayXFactor >= 9) {
    finalAwayScore = finalAwayScore + 1;
  }
  if (awayXFactor >= 10) {
    finalAwayScore = finalAwayScore + 2;
  } else if (awayXFactor == 7) {
    finalAwayScore = 0;
  }

  const completedScore = {
    finalAwayScore: finalAwayScore,
    finalHomeScore: finalHomeScore
  };

  console.log('CompletedScore: ', completedScore);

  // console.log("Aventura: ", finalHomeScore);
  // console.log("Hawthorne: ", finalAwayScore);
  // console.log("---------------------------");

  if (finalHomeScore === 0 && finalAwayScore === 0) {
    scorelessDraws++;
  }

  if (finalHomeScore === finalAwayScore) {
    draws++;
  }

  if (finalHomeScore > finalAwayScore) {
    homeTeamWins++;
  }

  if (finalAwayScore > finalHomeScore) {
    awayTeamWins++;
  }

  return completedScore;
}

const getTotalsStrongHomeWeakAway = () => {
  let iterations = 100;
  for (let i = 0; i < iterations; i++) {
    genScore("Solston", "Janders");
  }

  // PRINT AGG RESULTS
  console.log();
  console.log("STRONG/WEAK DONE!!!");
  console.log();
  console.log("Games played: ", draws + homeTeamWins + awayTeamWins);
  console.log("----------------------------");
  console.log("draws: ", draws);
  // console.log('scoreLessDraws: ', scorelessDraws);
  console.log("homeTeamWins: ", homeTeamWins);
  console.log("awayTeamWins: ", awayTeamWins);
  console.log();
};

const getTotalsEquallyMatched = () => {
  let iterations = 1000;
  for (let i = 0; i < iterations; i++) {
    genScore("Janders", "Aventura");
  }

  // PRINT AGG RESULTS
  console.log();
  console.log("EQUALLY MATCHED DONE!!!");
  console.log();
  console.log("Games played: ", draws + homeTeamWins + awayTeamWins);
  console.log("----------------------------");
  console.log("draws: ", draws);
  // console.log('scoreLessDraws: ', scorelessDraws);
  console.log("homeTeamWins: ", homeTeamWins);
  console.log("awayTeamWins: ", awayTeamWins);
  console.log();
};

// getTotalsStrongHomeWeakAway();
// getTotalsEquallyMatched();

genScore("Aventura", "Westingdon");
