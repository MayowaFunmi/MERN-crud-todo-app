const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 5 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, minlength: 10, maxlength: 200, unique: true },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User