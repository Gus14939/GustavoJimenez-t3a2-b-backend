const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
});

const postModel = mongoose.model('Post', PostSchema);

module.exports = { postModel };