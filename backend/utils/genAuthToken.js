const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt
    }, secretKey, { expiresIn: "2m" });
    return token;
}
const getRefreshToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt
    }, secretKey);
    return token;
}

module.exports = { getAuthToken, getRefreshToken };