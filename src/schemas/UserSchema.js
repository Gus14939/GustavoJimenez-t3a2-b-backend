const mongoose = require("mongoose");
const { postSchema } = require("./PostSchema");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        unique: false
    },
    address: {
        // I may just need the postcode/suburb to give an idea of the location, the user may want to personally share his/her address in personal messages
        suburb:  {
            type: String,
            required: true
        },
        postcode:  {
            type: Number,
            required: true
        }
    },
    favouritePlant: {
        type: String,
        required: false,
        unique: false
    },
},
{
    timestamps: true
});

userSchema.pre(
    "save",
    async function (next){
        const user = this;
        if (!user.isModified("password")){
            return next();
        }
        console.log("pre-save hook running and password is modified!")


        console.log(`raw password is: ${this.password}`)
        const hash = await bcrypt.hash(this.password, 10)
        console.log(`hashed, encrypted and salted password is: ${hash}`)

        this.password = hash;

        next();
    }
)


module.exports = {
    userSchema
};