// **User**:
// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed
// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)
// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model
// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

/* 2/12/24 
virtuals - needed, tyes for virtual friendCount
*/

const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friendsCount')
    .get(function () { return this.friends.length; });

const User = model('user', userSchema);

module.exports = User;