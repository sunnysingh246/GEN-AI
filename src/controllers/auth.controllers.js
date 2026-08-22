const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blackListModel = require('../models/blackList.model.js')
const tokenBlackListmodel = require('../models/blackList.model.js')

/**
 * @name registerUserController 
 * @description register new user ecpects userName,email and password
 * @access Public
 */

async function registerUserController(req, res) {
    const { userName, email, password } = req.body
    if (!userName, !email, !password) {
        return res.status(400).json({
            message: "Provide all credential"
        })
    }

    const isuserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { userName }]
    })

    if (isuserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email OR username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        userName,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("TOken", token)

    res.status(200).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.userName,
            email: user.email
        }
    })

}



/**
 * @name loginUserController
 * @description Login a user aspects user email OR userName and password in request body
 * @access Public
 */

async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid email OR password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email OR password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("Token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.userName,
            email: user.email
        }
    })
}



/**
 * @name logoutUserController
 * @description clear token from user cookie and add to blacklist
 * @access Public
 */
async function logoutUserControllers(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlackListmodel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User loggedOut successfully"
    })
}



/**
 * @name getMeController
 * @description get the current user logged in detail
 * @access Private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User detail fetched successfully",
        user: {
            id: user._id,
            username: user.userName,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserControllers,
    getMeController
}
