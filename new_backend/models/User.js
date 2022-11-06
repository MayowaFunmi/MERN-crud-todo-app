import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const userScema = new schema({
    username: { type: String, required: true, minlength: 5 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, minlength: 10, maxlength: 200, unique: true },
    password: { type: String, required: true, minlength: 6 },
    roles: {
        type: [String],
        enum: ["user", "admin", "super_admin"],
        default: ["user"]
    }
}, { timestamps: true })

const User = mongoose.model("User", userScema);

export default User;