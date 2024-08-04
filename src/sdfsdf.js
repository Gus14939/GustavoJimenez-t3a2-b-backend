const { dbConnect, dbDisconnect, dbClear } = require("../database");
const { userModel, postModel } = require("../models/models.js");
const defaultUsersData = require('./defaultUsers.json');
const defaultPostsData = require('./defaultPosts.json');
const { comparePasswords, createJWT, vallidateJWT } = require('./authHelpers.js');

async function seedUsers() {
    const seed_defaultUsers = [];
    for (let user = 0; user < defaultUsersData.length; user++) {
        const eachUser = defaultUsersData[user];

        let individual_defaultUser = await userModel.create(eachUser);
        await individual_defaultUser.save();

        seed_defaultUsers.push(individual_defaultUser);
    }
    return seed_defaultUsers;
}

async function seedPosts(userData) {
    const defaultPostsData_map = defaultPostsData.map((post, index) => {
        const randomUserData_id = Math.floor(Math.random() * (defaultUsersData.length));
        return {
            postCreator: userData[randomUserData_id]._id,
            title: post.title,
            plantName: post.plantName,
            description: post.description,
            category: post.category,
            usersLikedPost: [] // Ensure this is populated as per your logic
        };
    });

    let seed_defaultPosts = await postModel.insertMany(defaultPostsData_map);
    return seed_defaultPosts;
}

async function updateUserPostHistoryAndLikedPosts() {
    try {
        
        const users = await userModel.find({});
        const posts = await postModel.find({});

        const userPostsMap = {};
        const userLikedPostsMap = {};

        posts.forEach(post => {
            if (!userPostsMap[post.postCreator]) {
                userPostsMap[post.postCreator] = [];
            }
            userPostsMap[post.postCreator].push(post._id);

            post.usersLikedPost.forEach(userId => {
                if (!userLikedPostsMap[userId]) {
                    userLikedPostsMap[userId] = [];
                }
                userLikedPostsMap[userId].push(post._id);
            });
        });

        const updatePromises = users.map(user => {
            const postHistory = userPostsMap[user._id] || [];
            const likedPosts = userLikedPostsMap[user._id] || [];
            return userModel.updateOne({ _id: user._id }, { postHistory, likedPosts });
        });

        await Promise.all(updatePromises);
        console.log('User post histories and liked posts have been updated.');
    } catch (error) {
        console.error('Error updating user post histories and liked posts:', error);
    }
}

async function seed() {
    await dbConnect();
    await dbClear();

    let newUsers = await seedUsers();
    let newPosts = await seedPosts(newUsers);

    console.log("User used: " + newUsers[0]._id);
    let newJWT = createJWT(newUsers[0]._id);
    console.log("New JWT: " + newJWT);

    vallidateJWT(newJWT);

    // Update postHistory and likedPosts for each user
    await updateUserPostHistoryAndLikedPosts();

    console.log("All Data seeded");
    dbDisconnect();
}

seed();
