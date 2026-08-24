import mongoose from 'mongoose'

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
        type: string,
        required: [true, "ANswer is required"]
    }

}, {
    _id: false
})


const BehaviouraQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },

    answer: {
        type: string,
        required: [true, "ANswer is required"]
    }

}, {
    _id: false
})


const skillGapSChema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },

    answer: {
        type: string,
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

    taska: [{
        type: String,
        required: [true, "task is required"]
    }],

    technicalQuestion: [technicalQuestionSchema],
    BehaviouraQuestion: [BehaviouraQuestionSchema],
    skillGap: [skillGapSChema],
    preparationPlan: [preparationPlanSchema]
})



const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },

    resume: {
        type: String
    },

    selfDescription: {
        type: String
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },

    technicalQuestion: []
}, {
    timestamps: true
})


const interviewReportModel = new mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel
