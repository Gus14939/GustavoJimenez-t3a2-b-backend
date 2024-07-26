const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    // have to link the user who's messaging
    fromUser:{
        // replaced with Mongoose Obj ID from User
        // type: { type: mongoose.Types.ObjectId, ref: 'User_Model' }
        type: String
    },
    message:{
        type: [String],
        required: true
    },
},
{
    timestamps: true
});

module.exports = {
    messagesSchema
};