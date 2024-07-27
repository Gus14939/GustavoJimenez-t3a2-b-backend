const express = require("express");
const { postModel } = require("../models/models");

const userRouter = express.Router();

// READ
userRouter.get("/", async (req, res) => {
    let result = await postModel.find({});
    
    console.log(result)
    res.json({
        message: "Viewing posts",
        data: result
    });
});

userRouter.get("/:id", async (req, res) => {
    let result = await postModel.findById(req.params.id);

    res.json({
        message: "Viewing post by id",
        data: result
    });
});
// CREATE
userRouter.post("/:id", async (req, res, next) => {
    let result = await postModel.create(req.body).catch(error => {
        error.status = 400;
        return error;
    });

    if (result.errors) {
        return next(result)
    }

    res.json({
        message: "Creating post",
        data: result
    });
});

// UPDATE
userRouter.patch("/:id", async (req, res, next) => {
    let result = await postModel.findByIdAndUpdate(
		req.params.id, 
		req.body,
		{
			returnDocument: "after"
		}
	);
    
    res.json({
        message: "Updating post",
        data: result
    });
});

// DELETE
userRouter.delete("/:id", async (req, res) => {
    let result = await postModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "Delete post with",
        data: result

    });
});

module.exports = userRouter