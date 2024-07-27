const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Model',
        required: true
    },
    // have to link the user who's messaging
    // posts:{
    //     type: [{
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: 'Post_Model',
    //         required: true
    //     }]
    // }
},
{
    timestamps: true
});

module.exports = {
    messagesSchema
};