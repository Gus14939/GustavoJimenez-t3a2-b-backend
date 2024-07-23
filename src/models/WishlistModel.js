const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    item: {
        type: mongoose.Types.ObjectId, ref: 'Post'
    }
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { Wishlist };