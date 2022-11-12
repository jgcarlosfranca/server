const mongoose = require("mongoose")
const bcrypt = require("bcrypt");



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

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    console.log('bcrypt.genSalt', salt)
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model("User", userSchema)