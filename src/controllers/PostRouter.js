const express = require("express");
const { postModel } = require("../models/models");

const postRouter = express.Router();

// READ
postRouter.get("/all", async (req, res) => {
    let result = await  postModel.find({})
                        .populate([
                            { path: "postCreator", select: "username" },
                            { path: "usersLikedPost", select: "username" }
                        ]);
    
    console.log(result)
    res.json({
        message: "Viewing posts",
        data: result
    });
});

postRouter.get("/postDetails/:id", async (req, res) => {
    let result = await postModel.findById(req.params.id);

    res.json({
        message: "Viewing post by id",
        data: result
    });
});
// CREATE
postRouter.post("/postYourPlant", async (req, res, next) => {
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
postRouter.patch("/:id", async (req, res, next) => {
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
postRouter.delete("/:id", async (req, res) => {
    let result = await postModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "Delete post with",
        data: result

    });
});

module.exports = postRouter