const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    // have to link the user who's messaging
    fromUser:{
        // replaced with Mongoose Obj ID from User
        type: { type: mongoose.Types.ObjectId, ref: 'User_Model' }
    },
    message:{
        type: [String],
        required: true
    },
},
{
    timestamps: true
});

const messagesModel = mongoose.model('Messages_Model', messagesSchema);

module.exports = messagesModel;