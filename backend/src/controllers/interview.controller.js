const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service.js')
const interviewReportModel = require('../models/interviewReport.model.js')

async function generateInterviewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer)).getText())
    const { selfDescribe, jobDescribe } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescribe,
        jobDescribe
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescribe,
        jobDescribe,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}


module.exports = { generateInterviewReportController }