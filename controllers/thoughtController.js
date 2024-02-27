const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thought);
        } catch (error) {
            
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this Id' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );
            console.log(thought);
            if (!thought) {
                return res.status(404).json({message: 'No thought with this Id'});
            }
            res.json(thought);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                {runValidators: true, new: true }
            );
            if(!thought) {
                res.status(404).json({message: 'No thought with this Id'});
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};