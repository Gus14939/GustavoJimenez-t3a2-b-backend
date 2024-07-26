const mongoose = require("mongoose");

//  Schemas
const { userSchema } = require("../schemas/UserSchema.js");
const { postSchema } = require('../schemas/PostSchema.js');

// const { wishlistSchema } = require("../schemas/WishlistSchema.js");
// const { tradeHistorySchema } = require("../schemas/TradeHistorySchema.js");
// const { messagesSchema } = require("../schemas/MessagesSchema.js");



const userModel = mongoose.model('User_Model', userSchema);
const postModel = mongoose.model('Post_Model', postSchema);

// const wishlistModel = mongoose.model('Wishlist_Model', wishlistSchema);
// const tradeHistoryModel = mongoose.model('TradeHistory_Model', tradeHistorySchema);

// const messagesModel = mongoose.model('Messages_Model', messagesSchema);


module.exports = {
    userModel,

    postModel,

    // wishlistModel,

    // tradeHistoryModel

    // messagesModel, 
    // messagesSchema
 };