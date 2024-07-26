const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Model',
        require: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // this has to be searched and match with the API
    // this name will ALSO bring the IMAGE of the plant from the API
    plantName: {
        type: String, // aided with API
        required: true
    }, 
    //
    description: {
        type: String,
        required: true
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
    }
},
{
    timestamps: true
});

module.exports = { 
    postSchema
 };