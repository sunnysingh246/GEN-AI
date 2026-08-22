const { Router } = require('express')
const authController = require('../controllers/auth.controllers.js')
const authMiddleware = require('../middleware/auth.middleware.js')

const authRouter = Router()


/**
*@router POST /api/auth/register
*@description Register a new user
*@access Public
 */
authRouter.post("/register", authController.registerUserController)


/**
*@router POST /api/auth/login
*@description login a new user
*@access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
*@router GET/api/auth/logout
*@description clear token from user cookie and token in blacklist
*@access Private
 */
authRouter.get("/logout", authController.logoutUserControllers)


/**
*@router GET/api/auth/Get-me
*@description get the current logged in user detail
*@access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter