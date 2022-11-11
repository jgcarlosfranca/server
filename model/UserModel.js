const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "PassWord is Required"],
    }
})

module.exports = mongoose.model("User", userSchema)