const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThoughts)
    .post(createThought);

//passing thoughtId to the crud for thought body
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//passing thoughtId to the createReaction and reaction body
router.route('/:thoughtId/reactions').post(createReaction);

//passing thoughtId and reactionId to the removeReaction function
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;