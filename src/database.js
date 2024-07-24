// import mongoose
const mongoose = require("mongoose");

async function dbConnect(){
    let dbURL = process.env.DATABASE_URL || "mongodb://localhost:27017/planthoraDB";
    await mongoose.connect(dbURL);
    console.log("Database connection completed");
};

async function dbDisconnect(){
    await mongoose.connection.close();
};

module.exports = {
    dbConnect,
    dbDisconnect
}