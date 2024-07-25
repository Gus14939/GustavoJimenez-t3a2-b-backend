const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    wishlistItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post_Model',
        required: true
    }
});

const wishlistModel = mongoose.model('Wishlist_Model', wishlistSchema);

module.exports = { 
    wishlistModel,
    wishlistSchema
 };
