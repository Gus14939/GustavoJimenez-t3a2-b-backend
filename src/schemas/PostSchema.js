const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postCreator: {
        // type: {type: mongoose.Schema.Types.ObjectId, ref: 'User_Model'}, this one breaks if no []
        type: mongoose.Schema.Types.ObjectId, ref: 'User_Model', // this one is correct
        required: false,
        unique: false // for a user to create more than one post. unique: needs to be false
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    // this has to be searched and match with the API
    // this name will ALSO bring the IMAGE of the plant from the API

    plantName: {
        type: String,
        required: true,
        unique: true
    },
    plantInfo: {
        id: {
            type: Number,
            required: false,
            unique:false
        }
    }, 
    //
    description: {
        type: String,
        required: true,
        unique:false
    },
    category: {
        free: {
            type: Boolean,
            default: false
        },
        swap: {
            type: Boolean,
            default: false
        },
        wanted: {
            type: Boolean,
            default: false
        }
    },
    usersLikedPost: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User_Model'}], // try this one
        required: false,
        unique: false
    }
},
{
    timestamps: true
});

module.exports = { 
    postSchema
 };