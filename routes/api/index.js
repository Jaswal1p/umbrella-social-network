const router = require('express').Router();

const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

// export module router
module.exports = router;