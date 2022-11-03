const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const User = require("../models/users");
const { getAuthToken, getRefreshToken } = require("../utils/genAuthToken");

const router = express.Router()

router.post("/", async(req, res) => {
    // validate data coming from frontend
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(10).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });
    // incoming data is req.body
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if user exists already
    let user = await User.findOne({ email: req.body.email, username: req.body.username });
    if (user) return res.status(400).send("Email already exists");
    if (user.username) return res.status(400).send("Username already exists");

    // create user document
    user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    // generate json web token
    const token = getAuthToken(user);
    const accessToken = getAuthToken(user);
    const refreshToken = getAuthToken(user);
    res.send(token);
    //res.send({
    //     id: user._id,
    //     first_name: user.firstName,
    //     last_name: user.lastName,
    //     email: user.email,
    //     date_created: user.createdAt,
    //     accessToken: accessToken,
    //     refreshToken: refreshToken
    // })
})

module.exports = router;