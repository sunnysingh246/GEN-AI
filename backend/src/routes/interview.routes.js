const express = require('express')
const authMiddleware = require("../middleware/auth.middleware.js")
const interViewController = require("../controllers/interview.controller.js")
const upload = require('../middleware/file.middleware.js')

const interviewRouter = express.Router()

/**
 * @Route POST /api/interview
 * @description generate new interview report on the basis of user selfDescription, resume pdf and job description
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interViewController.generateInterviewReportController)

module.exports = interviewRouter