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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts' 
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// get total count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// create the users model using the above user schema
const Users = model('Users', UsersSchema);

module.exports = Users;