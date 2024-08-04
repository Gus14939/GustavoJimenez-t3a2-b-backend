const express = require("express");
const { userModel, postModel } = require("../models/models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
userRouter.post("/signup", async (req, res, next) => {
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
// LOGING
userRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Finding the user
        const userLoginIn = await userModel.findOne({ username });
        if (!userLoginIn) {
            return res.status(404).json({ message: "User not found" });
        }
        // Password validation
        const matched = await bcrypt.compare(password, userLoginIn.password)
        if (!matched) {
            return res.status(401).json({ message: "Wrong Password" });
        } else {
            return res.status(200).json({ message:"well done buddy!" })
        }

        // JWT TOKEN
        const userPayload = {
            useJWT: {
                id: userLoginIn._id,
                username: userLoginIn.username
            }
        }

        jwt.sign(
            userPayload,
            process.env.JWT_KEY,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
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
        message: "Deleted profile with:",
        data: result

    });
});

module.exports = userRouter