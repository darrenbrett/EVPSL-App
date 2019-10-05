const Round = require('./model');

// Get all games from a specific regular season
exports.getGamesByRound = async ctx => {
  const {
    round
  } = ctx.request.query;
  if (!round) {
    ctx.response.status = 404;
    return "You must provide a round to filter by.";
  }
  return Round.find({
    round
  });
};

// Get all rounds for a given year
exports.getAllRoundsByYear = async ctx => {
  console.log('all rounds by year firing...');
  let {
    year
  } = ctx.request.query;
  year = parseInt(year);
  console.log('year: ', year);
  if (!year) {
    ctx.response.status = 404;
    return "You must provide a year to filer by.";
  }
  return Round.find({
    year
  });
};
