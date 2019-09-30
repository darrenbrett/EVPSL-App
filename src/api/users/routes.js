const router = require('koa-router')();

const controller = require('./controller');

// Get a single user's record
router.get('/get-by-id', async ctx => {
  const user = await controller.getById(ctx);
  ctx.body = user;
});

router.get('/', async ctx => {
  const users = await controller.getAll();
  ctx.body = users;
});

router.post('/create', async ctx => {
  const data = ctx.request.body;
  const user = await controller.create({
    data
  });
  ctx.body = user;
});

router.post('/login', async ctx => {
  const user = await controller.getByCredentials(ctx);
  ctx.body = user;
});

router.post('/update', async ctx => {
  const user = await controller.update(ctx);
  ctx.body = user;
});

module.exports = router.routes();
