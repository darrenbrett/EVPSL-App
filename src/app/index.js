const Koa = require('koa');
const router = require('./../routing');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-morgan');
const responseTime = require('koa-response-time');

const database = require('../database');
const routeAuth = require('./../middleware/routeAuth');
const app = new Koa();

// Log response time of calls
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`API response time: ${ms} ms.`);
});

// Authentication
app.use(async (ctx, next) => {
  if (!ctx.url.includes('login') && (!ctx.url.includes('create'))) {
    const authHeader = ctx.req.headers.authorization;
    if (!authHeader) {
      console.log('No auth header provided.');
      return;
    }
    await routeAuth(ctx, authHeader, next);
  } else if ((ctx.url.includes('login')) || (ctx.url.includes('create'))) {
    console.log('Login or create API call triggered...');
    await next();
  }
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
