const router = require('koa-router')();
const controller = require('./controller');

router.get('/', async ctx => {
  const teams = await controller.getAll();
  ctx.body = teams;
});

router.get('/year', async ctx => {
  const teams = await controller.getAllByYear();
  ctx.body = teams;
});

router.post('/', async ctx => {
  const data = ctx.request.body;
  const team = await controller.create({
    data
  });
  ctx.body = team;
});

router.post('/update', async ctx => {
  const game = await controller.update(ctx);
  ctx.body = game;
});

module.exports = router.routes();
