const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        // replaced with Mongoose Obj ID from User
        // type: { type: mongoose.Types.ObjectId, ref: 'User_Model' },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Model' },
        require: true
    },
    title: {
        type: String,
        required: true
    },
    // this has to be searched and match with the API
    // this name will bring the image of the plant
    nameofplant: {
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
        },
        // Could I use enum?
        enum:["free", "swap", "wanted"],
        require: true

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