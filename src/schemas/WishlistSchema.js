const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    wishlistItem: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Post_Model',
        // required: true
        type: String,
        required: false
    }
});


module.exports = {
    wishlistSchema
 };
