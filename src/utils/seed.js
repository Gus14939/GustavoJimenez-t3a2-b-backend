// import default users and posts to
// start with some interesting fake posts created by fake users
const defaultUsersData = require('./defaultUsers.json')
const defaultPostsData = require('./defaultPosts.json')

// JWT
const { comparePasswords, createJWT, vallidateJWT } = require('./authHelpers.js');

// Import modes and schemas from models.js
const { userModel, postModel } = require("../models/models.js")


// import database connect
const { dbConnect, dbDisconnect, dbClear } = require("../database");


async function seedUsers() {
    const seed_defaultUsers = [];
    for (let user = 0; user < defaultUsersData.length; user++) {
        const eachUser = defaultUsersData[user];
        
        console.log(`save ${user}`);

        let individual_defaultUser = await userModel.create(eachUser);
        await individual_defaultUser.save();

        console.log(`saves ${individual_defaultUser}`);
        seed_defaultUsers.push(individual_defaultUser)
    }

    const jakeUser = seed_defaultUsers.find(user => user.username === 'Jakowhito');
    console.log("Jakes pass is: " + jakeUser.password)
    let jakesPass = await comparePasswords("123456", jakeUser.password)
    console.log("jakes password is 12456: " + jakesPass)
    
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

    console.log("user used " + newUsers[0]._id);
    let newJWT = createJWT(newUsers[0]._id);
    console.log("new JWT: " + newJWT);

    vallidateJWT(newJWT);

    console.log("All Data seeded");
    // disconnect database
    dbDisconnect();
}

seed();

