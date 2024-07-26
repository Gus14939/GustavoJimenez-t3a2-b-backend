const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Model',
        require: true
    },
    // post should have the info of the user who created the post
    posts:{
        type: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post_Model',
            require: true
        }]
    }
});


module.exports = {
    wishlistSchema
 };
