const router = require('express').Router();

// set requirements 
const {
    createUsers,
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers
} = require('../controllers/users-controller');

// Set up GET and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

// Set up GET one, PUT and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);


// export router
module.exports = router;    
