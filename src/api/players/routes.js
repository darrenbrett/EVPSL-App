const router = require('koa-router')();
const controller = require('./controller');

// Get a single player's record
router.get('/get-by-id', async ctx => {
  console.log('player route firing...');
  const player = await controller.getById(ctx);
  console.log('player: ', player);
  ctx.body = player;
});

// Get all player records
router.get('/', async ctx => {
  console.log('getAll firing...');
  const players = await controller.getAll();
  ctx.body = players;
});

// Create a new player record
router.post('/', async ctx => {
  const data = ctx.request.body;
  console.log('data: ', data);
  const player = await controller.create({
    data
  });
  ctx.body = player;
});

// Update a player record
router.put('/', async ctx => {
  const data = ctx.request.body;
  const player = await controller.update({
    data
  });
  ctx.body = player;
});

module.exports = router.routes();
