// call the .env
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const express = require("express");

dotenv.config();

// Instance express server
const dbApp = express();

/*
:::::::::::::::::::::::
// Check cors when interacting with the front-end

// const cors = require('cors');
// var corsOptions = {
//     origin: ["http://localhost:5000", "https://deployedApp.com"],
//     optionsSuccessStatus: 200
// }
// dbApp.use(cors(corsOptions));
:::::::::::::::::::::::::
*/

// API request data using json
dbApp.use(express.json());
dbApp.use(express.urlencoded({extended: true}));


dbApp.get("/", (req, res) => {
    res.json({
        message: "Planthora is AAAALIVE!!"
    });
});


// profile
const userRouter = require("./controllers/UserRouter.js");
dbApp.use("/profiles", userRouter);

// post
const postRouter = require("./controllers/PostRouter.js");
dbApp.use("/posts", postRouter);


// Server Health Details
dbApp.get("/dbHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});


// Keep at the end
// Non-Existent Pages
dbApp.get("*", (req, res) => {
    res.status(404).json({
        message: "This URL path does not exist",
        pagePath: `${req.path}`
    });
});


// Server Crash
dbApp.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: "An error has occured!",
        error: error.message
    });
});

// Export dbAPP
module.exports = {
    dbApp
};