const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        // replaced with Mongoose Obj ID from User
        // type: { type: mongoose.Types.ObjectId, ref: 'User_Model' },
        // type: mongoose.Schema.Types.ObjectId, 
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
    // this name will bring the image of the plant
    plantName: {
        type: String, // from API
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

const postModel = mongoose.model('Post_Model', postSchema);

module.exports = { 
    postModel, 
    postSchema
 };