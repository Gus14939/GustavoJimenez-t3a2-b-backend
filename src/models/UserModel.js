const mongoose = require("mongoose");

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
    password: String,
    address: {
        // I may just need the postcode/suburb to give an idea of the location, the suer may want to personally share his/her address in personal messages
        // street: String,
        suburb:  {
            type: Number,
            required: true
        },
        postcode:  {
            type: Number,
            required: true
        },
        // state: String,
    },
    favplant: {
        type: String,
        required: false,
        unique: false
    },
    /////////// linked dbs
    posts: {
        type: [String]      // replace with Mongoose Obj ID
    },
    wishlist: {
        type: [String]      // replace with Mongoose Obj ID
    },
    tradehistory: {
        type: [{
            user: String,
            timestamp: Date
        }]      // replace with Mongoose Obj ID
    },
    messages: {             // replace with Mongoose Obj ID
        username:{
            type: [String]  // replace with Mongoose Obj ID
        },
        message:{
            type: [String]
        },
    }
},
{
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;