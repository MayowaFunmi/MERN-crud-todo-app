import { Router } from "express";
import User from "../models/User.js";
import bcrypt, { hash } from 'bcrypt';
import { loginBodyValidation, signUpBodyValidation } from "../utils/validationSchema.js";
import generateTokens from "../utils/generateTokens.js";
const router = Router();

// signup
router.post("/signup", async(req, res) => {
    try {
        const { error } = signUpBodyValidation(req.body);
        if (error) {
            return res.status(400).send({ error: true, message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: true, message: "User with email already exists" })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword }).save();
        res.status(200).send({ error: false, message: "User Account created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "There is internal server error" })
    }
});

// login
router.post("/login", async(req, res) => {
    try {
        const { error } = loginBodyValidation(req.body);
        if (error) {
            return res.status(400).send({ error: true, message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: true, message: "Invalid! User with email does not exist" })
        }

        const verifiedPassword = await bcrypt.compare(req.body.password, user.password);
        if (!verifiedPassword) {
            return res.status(400).send({ error: true, message: "Invalid password!!" })
        }

        // generate access and refresh tokens
        const { accessToken, refreshToken } = await generateTokens(user);
        res.status(200).send({
            error: false,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "Logged in successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "There is internal server error" })
    }
})
export default router;