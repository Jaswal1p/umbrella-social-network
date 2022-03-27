const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // here I wil use RegEx to validate eneterd email, as learned in the class activity and RegEx created in assignment 17
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


// create the users model using the above user schema
const Users = model('Users, UsersSchema');

module.exports = Users;