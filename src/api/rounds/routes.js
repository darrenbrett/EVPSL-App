const router = require('koa-router')();
const controller = require('./controller');

// Get all rounds for a given year
router.get('/rounds-by-year', async ctx => {
  const games = await controller.getAllRoundsByYear(ctx);
  ctx.body = games;
});

// Get a round of games
router.get('/games-by-round', async ctx => {
  const games = await controller.getGamesByRound(ctx);
  ctx.body = games;
});

module.exports = router.routes();
