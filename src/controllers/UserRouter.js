const express = require("express");
const { userModel, postModel } = require("../models/models");

const userRouter = express.Router();

// READ
userRouter.get("/all", async (req, res) => {
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
// CREATE
userRouter.post("/", async (req, res, next) => {
    let result = await userModel.create(req.body).catch(error => {
        error.status = 400;
        return error;
    });

    if (result.errors) {
        return next(result)
    }

    res.json({
        message: "Creating profile",
        data: result
    });
});

// UPDATE
userRouter.patch("/:id", async (req, res, next) => {
    let result = await userModel.findByIdAndUpdate(
		req.params.id, 
		req.body,
		{
			returnDocument: "after"
		}
	);
    
    res.json({
        message: "Updating profile",
        data: result
    });
});

// DELETE
userRouter.delete("/:id", async (req, res) => {
    let result = await userModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "Delete profile with",
        data: result

    });
});

module.exports = userRouter