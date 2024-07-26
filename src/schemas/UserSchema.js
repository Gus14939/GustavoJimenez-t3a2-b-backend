const mongoose = require("mongoose");
const { postSchema } = require("./PostSchema");

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
        suburb:  {
            type: String,
            required: true
        },
        postcode:  {
            type: Number,
            required: true
        }
    },
    favouritePlant: {
        type: String,
        required: false,
        unique: false
    },

    /////////// linked dbs

    posts: {
        // replaced with Mongoose Obj ID from Post
        // type: [postSchema]
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Post_Model"}], 
        // type: String,
        required: true
    },
    wishlist: {
        // replaced with Mongoose Obj ID from Wishlist
        // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist_Model' }]
        // type: [wishlistSchema],
        type: String,
        required: false
    },
    trades: {
        // replaced with Mongoose Obj ID from TradeHistory
        // type: [tradeHistorySchema],
        type: String,
        required: false
    },

    // messages may be implemented if time allows for it
    messages: {    
        // replaced with Mongoose Obj ID from Messages
        // type: [{ type: mongoose.Types.ObjectId, ref: 'Messages_Model' }]
        type: String,
    }
},
{
    timestamps: true
});


module.exports = {
    userSchema
};