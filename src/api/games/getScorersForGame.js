const eligPlayersTest = ["John Smith", "Alexis Andresen", "Jose Alvarez", "Vincent Thomas", "Juan Sanchez"];
let eligPlayers = [];
let goalScorers = [];
const totalGoals = 3;

async function getEligiblePlayers(team) {
  if (!team) return;

  // Get array of players available to score
  eligPlayers = await Player.find({
    currentTeam: team,
    playStatus: active
  });
} 

function getScorer(eligPlayers) {
  const scorer = eligPlayers[Math.floor(Math.random()*eligPlayers.length)];
  console.log('scorer: ', scorer);
	return scorer;
}

// console.log('scorer: ', scorer);

let iterations = 0;

async function getScorersForGoals(iterations, totalGoals) {
  eligPlayers = await getEligiblePlayers() || eligPlayersTest;
  while (iterations < totalGoals) {
    console.log('iterations: ', iterations);
    console.log('goalScorers: ', goalScorers.length);
		let goalScorer = getScorer(eligPlayers);
		goalScorers.push(goalScorer);
    console.log('goalScorers: ', goalScorers);
  	iterations = iterations +1;
  }
}

console.log('getScorersForGoals: ', getScorersForGoals(iterations, totalGoals, eligPlayers));

module.exports = getScorersForGoals;