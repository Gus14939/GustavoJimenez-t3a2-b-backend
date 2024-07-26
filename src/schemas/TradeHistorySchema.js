const mongoose = require("mongoose");

const tradeHistorySchema = new mongoose.Schema({
    // have to link the user who the trade was made with
    tradesHistory:{
        // replaced with Mongoose Obj ID from User
        // type: { type: mongoose.Schema.Types.ObjectId, ref: 'Post_Model' }
        type: [String]
    },
});


module.exports = { 
    tradeHistorySchema,
};
