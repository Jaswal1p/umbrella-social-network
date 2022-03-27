const router = require('express').Router();


// Set requirements - from thoughts-controller
const {
    addThoughts,
    getAllThoughts,
    getThoughtById,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

 } = require('../../controllers/thoughts-controller');

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
    .post(addThoughts);

// route to create reaction to a thought /api/thoughts/:thoughtId/reactions by POST method
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// route to delete a reaction to thought /api/thoughts/:thoughtId/reactionId by DELETE method
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);    


// export module router
module.exports = router;
