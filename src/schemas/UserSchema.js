const mongoose = require("mongoose");
const { postSchema } = require("./PostSchema");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        unique: false
    },
    address: {
        // I may just need the postcode/suburb to give an idea of the location, the user may want to personally share his/her address in personal messages
        suburb:  {
            type: String,
            required: true
        },
        postcode:  {
            type: Number,
            required: true
        }
    },
    favouritePlant: {
        type: String,
        required: false,
        unique: false
    },
},
{
    timestamps: true
});


module.exports = {
    userSchema
};