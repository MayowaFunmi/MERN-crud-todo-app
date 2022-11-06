import { Router } from 'express';
import UserToken from '../models/UserToken.js';
import jwt from 'jsonwebtoken';
import verifyRefreshToken from '../utils/verifyRefreshToken.js';
import { refreshTokenBodyValidation } from '../utils/validationSchema.js';

const router = Router();
// get new access token

router.post("/", async(req, res) => {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error) {
        return res.status(400).send({
            error: true,
            message: error.details[0].message
        })
    }
    verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: user._id, username: user.username, email: user.email, roles: user.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '15m' }
            )
            res.status(200).send({
                error: false,
                accessToken: accessToken,
                message: "Access token created successfully"
            })
        })
        .catch((err) => res.status(400).send(err))
})

// logout
router.delete("/", async(req, res) => {
    try {
        const { error } = refreshTokenBodyValidation(req.body);
        if (error) {
            return res.status(400).send({
                error: true,
                message: error.details[0].message
            })
        }
        const userToken = await UserToken.findOne({ token: req.body.refreshToken });
        if (!userToken) {
            return res.status(200).send({ error: false, message: "Logged out successfully" })
        }
        await userToken.remove();
        return res.status(200).send({ error: false, message: "Logged out successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "An internal server error occured" })

    }
})


export default router;