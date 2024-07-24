const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    item: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post_Model' }]
    }
});

const wishlistModel = mongoose.model('Wishlist_Model', wishlistSchema);

module.exports = { 
    wishlistModel,
    wishlistSchema
 };
