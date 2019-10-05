const router = require('koa-router')();

const users = require('../api/users/routes');
const players = require('../api/players/routes');
const games = require('../api/games/routes');
const teams = require('../api/teams/routes');
const rounds = require('../api/rounds/routes');

router.use('/users', users);
router.use('/players', players);
router.use('/games', games);
router.use('/teams', teams);
router.use('/rounds', rounds);

module.exports = router;
