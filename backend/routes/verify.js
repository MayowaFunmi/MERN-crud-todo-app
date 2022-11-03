const jwt = require("jsonwebtoken");
require("dotenv").config()

const verify = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) return res.status(403).json("Token is invalid");
            res.send(data)
        })
    } else {
        res.status(401).json("You are not authenticated")
    }
}

module.exports = verify;