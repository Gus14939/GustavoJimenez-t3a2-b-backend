// import default users to start with some interesting fake users
const defaultUsersData = require('./defaultUsers.json')

const { userModel } = require("../models/UserModel.js")

// import database connect
const { dbConnect, dbDisconnect, dbClear } = require("../database");

async function seedUsers() {
    let seed_defaultUsers = await userModel.insertMany(defaultUsersData);

    console.log(seed_defaultUsers);
    return seed_defaultUsers;
}

async function seedPosts(userData) {

}

async function dbClose() {
    dbDisconnect();
    console.log("DB is disconnected")
}
async function dbDrop() {
    
}

async function seed(){

    await dbConnect();
    // drop database
    await dbClear();

    await seedUsers();
    // let defaulUsers = await seedUsers();
    // let defaulPosts = await seedPosts(defaulUsers);

    console.log("Data seeded");
    // disconnect database
    dbDisconnect();
}

seed();