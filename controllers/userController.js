const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('friends')
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with this id' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body }, 
                { runValidators: true, new: true });

            if (!user) {
                return res.status(404).json({ message: 'No user with this Id'});
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            // const user = await User.findOneAndRemove({ _id: req.params.userId });

            // remove user's thoughts
            // const thoughts = await Thought.findOneAndRemove({ _id: req.params.userId });
            
            if (!user) {
                return res.status(404).json({ message: 'No User with this Id' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that Id'});
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that Id'});
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};