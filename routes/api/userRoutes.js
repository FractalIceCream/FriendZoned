const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userId
//passing userId to single user operations
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//passing userId and friendId to friend operations
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

