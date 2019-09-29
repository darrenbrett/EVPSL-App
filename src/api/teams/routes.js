const router = require('koa-router')();
const controller = require('./controller');

// Get a single team's record
router.get('/get-by-id', async ctx => {
  const team = await controller.getById(ctx);
  ctx.body = team;
});

// Get all teams
router.get('/', async ctx => {
  const teams = await controller.getAll();
  ctx.body = teams;
});

// Create a new team
router.post('/', async ctx => {
  const data = ctx.request.body;
  console.log('data: ', data);
  const team = await controller.create({
    data
  });
  ctx.body = team;
});

// Update a team record
router.post('/update', async ctx => {
  const team = await controller.update(ctx);
  ctx.body = team;
});

module.exports = router.routes();
