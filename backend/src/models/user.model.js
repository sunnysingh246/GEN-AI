const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: [true, "UserName already taken"]
    },

    email: {
        type: String,
        unique: [true, "Account already exists with this email"],
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel