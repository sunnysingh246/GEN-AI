const mongoose = require('mongoose')

/**
 * -job description schema:string
 * resume text:string
 * self decription:string
 * 
 * matchScore:String 
 * 
 * 
 * technical question:
 *  [{
 *     question:""
 *     intention:""
 *     answer:""
 *  }]
 * 
 * 
 * Behavioural questions:
 *    [{
 *      question:""
 *      intention:""
 *      answer:""
 * }]
 * 
 * skill gap:[{
 * skill:""
 * severity:{
 *     type:String,
 *     enum:["Low","Medium","High"]
 * }
 * }]
 * 
 * 
 * preparation plan:[{
 *     day:Number,
 *     focus:string,
 *     tasks:[string]
 * }]
 */



const technicalQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: [true, "ANswer is required"]
    }

}, {
    _id: false
})


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: [true, "ANswer is required"]
    }

}, {
    _id: false
})


const skillGapSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: [true, "ANswer is required"]
    }

}, {
    _id: false
})


const preparationPlanSchema = new mongoose.Schema({

    day: {
        type: Number,
        required: [true, "Day is required"],
    },

    focus: {
        type: String,
        required: [true, "Focus is required"]
    },

    tasks: [{
        type: String,
        required: [true, "task is required"]
    }],
})



const interviewReportSchema = new mongoose.Schema({

    jobDescribe: {
        type: String,
        required: [true, "Job description is required"]
    },

    resume: {
        type: String
    },

    selfdescribe: {
        type: String
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }, title: {
        type: String,
        required: [true, "Job title is required"]
    }
}, {
    timestamps: true
})

const interviewReportModel = new mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel 
