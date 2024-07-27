// import default users and posts to
// start with some interesting fake posts created by fake users
const defaultUsersData = require('./defaultUsers.json')
const defaultPostsData = require('./defaultPosts.json')

// Import modes and schemas from models.js
const { userModel, postModel } = require("../models/models.js")


// import database connect
const { dbConnect, dbDisconnect, dbClear } = require("../database");

async function seedUsers() {
    let seed_defaultUsers = await userModel.insertMany(defaultUsersData);

    console.log("seed_defaultUsers");
    // console.log(seed_defaultUsers);
    return seed_defaultUsers;
}

async function seedPosts(userData) {
    const defaultPostsData_map = defaultPostsData.map((post, index) => {
        const randomUserDataId = Math.floor(Math.random() * (defaultUsersData.length))
        return {
            user: userData[randomUserDataId].id,
            username: userData[randomUserDataId].username,
            title: post.title,
            plantName: post.plantName,
            description: post.description,
            category: post.category,
        };
    });

    let seed_defaultPosts = await postModel.insertMany(defaultPostsData_map);

    console.log("seed_defaultPosts");
    // console.log(seed_defaultPosts);
    return seed_defaultPosts;
}

async function seed(){

    await dbConnect();
    // drop database
    await dbClear();

    let newUsers = await seedUsers();
    let newPosts = await seedPosts(newUsers);

    // let newUsersWithModelsData = await seedUsers(newPosts);

    // let defaulUsers = await seedUsers();
    // let defaulPosts = await seedPosts(defaulUsers);

    console.log("All Data seeded");
    // disconnect database
    dbDisconnect();
}

seed();

