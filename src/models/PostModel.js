const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    nameofplant: String,
    description: Text,
    category: {
        free: Boolean,
        swap: Boolean,
        wanted: Boolean
    },
    addedwishlist: Boolean
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };