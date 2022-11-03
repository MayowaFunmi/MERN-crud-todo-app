const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const User = require("../models/users");
const { getAuthToken, getRefreshToken } = require("../utils/genAuthToken");

const router = express.Router()

router.post("/", async(req, res) => {
    // validate data coming from frontend
    const schema = Joi.object({
        email: Joi.string().min(10).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if user exists already
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found!!! Check your email/password or register");
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send("invalid password")

    //const token = getAuthToken(user);
    const accessToken = getAuthToken(user);
    const refreshToken = getRefreshToken(user)
    res.status(200).send({
        message: "Login successfully",
        id: user._id,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
})

module.exports = router;