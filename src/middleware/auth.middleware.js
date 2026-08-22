const jwt = require('jsonwebtoken')
const tokenBlackListmodel = require('../models/blackList.model')

async function authUser(req, res, next) {
    const token = res.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "Token not provide"
        })
    }

    const isTOkenBlackListed = await tokenBlackListmodel.findOne({ token })
    if (isTOkenBlackListed) {
        return res.status(400).json({ message: "token is invalid " })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.user = decoded

        next()

    } catch (error) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
}

module.exports = { authUser }