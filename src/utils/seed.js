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
        const randomUserData_id = Math.floor(Math.random() * (defaultUsersData.length))
        const randomUserData_username = Math.floor(Math.random() * (defaultUsersData.length))
        return {
            postCreator: userData[randomUserData_id].id,
            title: post.title,
            plantName: post.plantName,
            description: post.description,
            category: post.category,
            usersLikedPost: userData[randomUserData_username].id, // not required
            postsLiked: []
        };
    });

    let seed_defaultPosts = await postModel.insertMany(defaultPostsData_map);

    console.log("seed_defaultPosts");
    return seed_defaultPosts;
}
// To be fair, this block below is with chatgpt... Hey, before this point I fixed things I thought I couldn't. I was having circular dependencies issues and couldn't assign the postCreator from the user to the post... 
// This one was just to complete the default database users and posts :D
async function updateUserPostHistory() {
    try {
        // Retrieve all users and posts
        const users = await userModel.find({});
        const posts = await postModel.find({});

        // Create a map to group posts by their postCreator
        const userPostsMap = {};
        posts.forEach(post => {
            if (!userPostsMap[post.postCreator]) {
                userPostsMap[post.postCreator] = [];
            }
            userPostsMap[post.postCreator].push(post._id);
        });

        // Update each user with their corresponding posts
        const updatePromises = users.map(user => {
            const postHistory = userPostsMap[user._id] || [];
            return userModel.updateOne({ _id: user._id }, { postHistory });
        });

        await Promise.all(updatePromises);
        console.log('User post histories have been updated.');
    } catch (error) {
        console.error('Error updating user post histories:', error);
    }
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

    // Update postHistory for each user
    await updateUserPostHistory();

    console.log("All Data seeded");
    // disconnect database
    dbDisconnect();
}

seed();

