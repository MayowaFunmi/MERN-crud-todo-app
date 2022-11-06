import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    const token = req.header("x-access-token");
    if (!token) {
        res.status(403).send({ error: true, message: "Access denied: no token provided" })
    }
    try {
        const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req.user = tokenDetails;
        next();
    } catch (error) {
        res.status(403).send({ error: true, message: "Access denied: invalid token" })
    }
}

export default auth;