/*
**Schema Settings**:
Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
---
**Reaction** (SCHEMA ONLY)
* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId
* `reactionBody`
  * String
  * Required
  * 280 character maximum
* `username`
  * String
  * Required
* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query
  *  */



/*

*/

const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);



// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;

