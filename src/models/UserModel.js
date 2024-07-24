const mongoose = require("mongoose");
const { tradeHistorySchema } = require("./TradeHistoryModel");
const { wishlistSchema } = require("./WishlistModel");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        unique: false
    },
    address: {
        // I may just need the postcode/suburb to give an idea of the location, the user may want to personally share his/her address in personal messages
        // street: String,
        suburb:  {
            type: String,
            required: true
        },
        postcode:  {
            type: Number,
            required: true
        },
        // state: String,
    },
    favouritePlant: {
        type: String,
        required: false,
        unique: false
    },

    /////////// linked dbs

    posts: {
        // replaced with Mongoose Obj ID from Post
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post_Model' }]
    },
    wishlist: {
        // replaced with Mongoose Obj ID from Wishlist
        // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist_Model' }]
        type: [wishlistSchema],
        required: false
    },
    trades: {
        // replaced with Mongoose Obj ID from TradeHistory
        type: [tradeHistorySchema],
        required: true
    },

    // messages may be implemented if time allows for it
    messages: {    
        // replaced with Mongoose Obj ID from Messages
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages_Model' }]
    }
},
{
    timestamps: true
});

const userModel = mongoose.model('User_Model', userSchema);

module.exports = {
    userModel,
    userSchema
};