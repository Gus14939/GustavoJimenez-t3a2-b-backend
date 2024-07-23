const express = require("express");
const { User } = require("../models/UserModel");
const routerUser = express.Router();

routerUser.get("/", async (req, res) => {
    res.json({
        message: "Viewing profiles",
    });
});

routerUser.get("/:id", async (req, res) => {
    let result = await User.findById(req.params.id).exec();

    res.json({
        message: "Viewing profile by id",
        data: result
    });
});

routerUser.post("/", (req, res) => {
    res.json({
        message: "Creating profile"
    });
});

routerUser.patch("/:id", (req, res) => {
    res.json({
        message: "Updating profile"
    });
});

routerUser.delete("/:id", async (req, res) => {
    let result = await User.findByIdAndDelete(req.params.id).exec();

    res.json({
        message: "Delete profile with",
        data: result

    });
});

module.exports = {
    routerUser    
}