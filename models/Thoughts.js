const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//ThoughtSchema
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            
        },
        username: {
            type: String,
            required: true
        },
        
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



// create thought model using the thoughts schema
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;