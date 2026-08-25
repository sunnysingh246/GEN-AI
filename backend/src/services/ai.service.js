const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema");
const { jobDescription } = require("./temp");



console.log("GoogleGenAI:", GoogleGenAI);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Hello Gemini!! Explain what an interview is"
    });

    console.log(response.text);
}


const interviewReportSchema = z.object({

    matchScore: z.number().description("A score between 0 and 100 indication how well candidate's profile matches the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question question ask in the interview"),
        intention: z.string().description("The intention of interviewer begind the asking question"),
        answer: z.string().description("How to answer the question , what point to cover , what approach to take etc")
    })).description("Behavioural question that can be asked in the interview along with their intention and how to answer them"),


    behavioralQuestin: z.array(z.object({
        question: z.string().description("The technical question question ask in the interview"),
        intention: z.string().description("The intention of interviewer begind the asking question"),
        answer: z.string().description("How to answer the question , what point to cover , what approach to take etc")
    })).description("Behavioural question that can be asked in the interview along with their intention and how to answer them"),


    akillGaps: z.string(z.object({
        skills: z.string().description("The skills which the candidate is lacking"),
        severity: z.enum(["LOW", "MEDIUM", "HIGH"]).description("The severity of the skill gaps i.e. how important the mising skills")
    })).description("List of skill gaps in the candidate profie along with their severity"),


    preparationPlan: z.array(z.object({
        day: z.number().description("The day number in the preparation plan, starting from 1"),
        focus: z.string().description("The main focus of this day in the preparation plan, e.g. data structures, mock interview"),
        tasks: z.array(z.string()).description("List of tasks to be done on this day to follow the preparation plan")
    })).description("A day-wise preparation plan for the candidate to follow in order to prepare effectively")

})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const response = await ai.models.generateContent({
        model: "gemini 3.5-flash",
        contents: "",
        config: {
            responseMineType: "application/json",
            responseJsonSchema: zodSToJson(interviewReportSchema)
        }
    })
}

module.exports = invokeGeminiAi;