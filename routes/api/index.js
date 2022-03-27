const router = require('express').Router();

const usersRoutes = require('./user-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', usersRoutes);

module.exports = router;