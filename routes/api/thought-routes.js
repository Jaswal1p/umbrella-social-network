const router = require('express').Router();


// Set requirements - from thoughts-controller
const {
    createThoughts,
    getAllThoughts,
    getThoughtById,
    updateThoughts,
    deleteThoughts


 }= require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// routes for /api/thoughts/:id    
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// route to create thought
router
    .route('/userId')
    .post(createThoughts);


// export module router
module.exports = router;
