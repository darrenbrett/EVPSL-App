const Koa = require('koa');
const router = require('./../routing');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-morgan');
const responseTime = require('koa-response-time');
const database = require('../database');
const jwt = require('koa-jwt');

const app = new Koa();
app.use(async (ctx, next) => {
  console.log('my middlware firing!!!');
  await next();
});
app.use(responseTime());
app.use(logger('combined'));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(ctx => {
  ctx.type = 'json';
});

module.exports.start = async () => {
  try {
    await database.connect();
    console.log('Connected to database');
    const port = 3000;
    await app.listen(port);
    console.log(`Connected on port: ${port}`);
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};
