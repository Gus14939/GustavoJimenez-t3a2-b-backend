const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// compare wraw password and encrypted password
async function comparePasswords(plainPassword, encryptedPassword){
    let doesPasswordsMatch = false;

    doesPasswordsMatch = await bcrypt.compare(plainPassword, encryptedPassword);
    // returns a Boolean
    return doesPasswordsMatch;
}

// create JWT
function createJWT(user_id){
    // payload of data / secrete key for JWT signature / Options for JWT expiry
    let newJWT = jwt.sign({id: user_id}, process.env.JWT_KEY, { expiresIn: "7d" });
    return newJWT
}

// Validate a JWT
function vallidateJWT(jwtToValidate){
    let isJWTvalid = false

    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodeJWT) => {
        if(error){
            throw new Error("User's JWT is not valid!");
        }
        console.log("Decoded JWT data: ")
        console.log(decodeJWT)
        isJWTvalid = true
    })

    return isJWTvalid;
}

module.exports = {
    comparePasswords,
    createJWT,
    vallidateJWT
}