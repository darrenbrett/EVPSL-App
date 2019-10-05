const router = require('koa-router')();
const controller = require('./controller');

// Get all games
router.get('/', async ctx => {
  const teams = await controller.getAll();
  ctx.body = teams;
});

// Get all games by year
router.get('/year', async ctx => {
  const games = await controller.getAllByYear();
  ctx.body = games;
});

// Create game
router.post('/', async ctx => {
  const data = ctx.request.body;
  const team = await controller.create({
    data
  });
  ctx.body = team;
});

// Update a game
router.post('/update', async ctx => {
  const game = await controller.update(ctx);
  ctx.body = game;
});

// Get a round of games
router.get('/round', async ctx => {
  console.log('by round firing in routes...');
  const games = await controller.getGamesByRound(ctx);
  ctx.body = games;
});

module.exports = router.routes();
