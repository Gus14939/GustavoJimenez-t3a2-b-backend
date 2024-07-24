const express = require("express");
const { userModel } = require("../models/UserModel");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    let result = await userModel.find({});
    
    console.log(result)
    res.json({
        message: "Viewing profiles",
        data: result
    });
});

userRouter.get("/:id", async (req, res) => {
    let result = await userModel.findById(req.params.id);

    res.json({
        message: "Viewing profile by id",
        data: result
    });
});

userRouter.post("/", async (req, res) => {
    let result = await userModel.create(req.body);

    res.json({
        message: "Creating profile",
        data: result
    });
});

userRouter.patch("/:id", (req, res) => {
    res.json({
        message: "Updating profile"
    });
});

userRouter.delete("/:id", async (req, res) => {
    let result = await userModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "Delete profile with",
        data: result

    });
});

module.exports = userRouter