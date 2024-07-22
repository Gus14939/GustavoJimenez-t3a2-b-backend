// call the .env
const dotenv = require("dotenv");
dotenv.config();

// Import express 
const express = require("express");
const planthoraApp = express();

// process.env
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

/*
:::::::::::::::::::::::
// Check cors when interacting with the front-end

// const cors = require('cors');
// var corsOptions = {
//     origin: ["http://localhost:5000", "https://deployedApp.com"],
//     optionsSuccessStatus: 200
// }
// planthoraApp.use(cors(corsOptions));
:::::::::::::::::::::::::
*/

// API request data using json
planthoraApp.use(express.json());
planthoraApp.use(express.urlencoded({extended: true}));

planthoraApp.get("/", (req, res) => {
    res.json({
        message: "Planthora is AAAALIVE!!"
    });
});


// Keep at the end
// non-existent pages
planthoraApp.get("*", (req, res) => {
    res.status(404).json({
        message: "This URL path does not exist",
        pagePath: `${req.path}`
    });
});

module.exports = {
    HOST,
    PORT,
    planthoraApp
};
