const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user:{
        type: [{type: mongoose.Schema.Types.ObjectId, 
            ref: 'User_Model'}],
        required: false,
        unique: false
    },
    // post should have the info of the user who created the post
    posts:{
        type: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post_Model',
            required: false,
            unique: false 
        }]
    }
});


module.exports = {
    wishlistSchema
 };
