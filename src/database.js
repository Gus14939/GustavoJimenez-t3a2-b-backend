// import mongoose
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function dbConnect(){
    let dbURL = process.env.DATABASE_URL || process.env.DATABASE_LOCAL_URL;
    await mongoose.connect(dbURL);
    console.log(":: DB Connected ::");
};

// database disconnect
async function dbDisconnect(){
    await mongoose.connection.close();
    console.log(":: DB Disconnected ::")
};

// database clear
async function dbClear(){
    await mongoose.connection.db.dropDatabase();
    console.log(":: DB Dropped ::")
};

module.exports = {
    dbConnect,
    dbDisconnect,
    dbClear
}