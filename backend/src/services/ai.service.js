const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

console.log("GoogleGenAI:", GoogleGenAI);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const interviewReportSchema = z.object({

    matchScore: z.number().describe(
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
    ),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe(
                "The technical question that can be asked in the interview"
            ),
            intention: z.string().describe(
                "The intention of the interviewer behind asking the question"
            ),
            answer: z.string().describe(
                "How to answer the question, what points to cover, and what approach to take"
            )
        })
    ).describe(
        "Technical questions that can be asked in the interview along with their intention and how to answer them"
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe(
                "The behavioral question that can be asked in the interview"
            ),
            intention: z.string().describe(
                "The intention of the interviewer behind asking the question"
            ),
            answer: z.string().describe(
                "How to answer the question, what points to cover, and what approach to take"
            )
        })
    ).describe(
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them"
    ),

    skillGaps: z.array(
        z.object({
            skills: z.string().describe(
                "The skills which the candidate is lacking"
            ),
            severity: z.enum(["LOW", "MEDIUM", "HIGH"]).describe(
                "The severity of the skill gap"
            )
        })
    ).describe(
        "List of skill gaps in the candidate profile along with their severity"
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe(
                "The day number in the preparation plan, starting from 1"
            ),
            focus: z.string().describe(
                "The main focus of this day in the preparation plan"
            ),
            tasks: z.array(z.string()).describe(
                "List of tasks to be done on this day"
            )
        })
    ).describe(
        "A day-wise preparation plan for the candidate"
    )

});


async function generateInterviewReport({
    resume,
    selfdescribe,
    jobdescribe
}) {

    const prompt = `
Generate an interview report for the candidate based on the following details:

Resume:
${resume}

Self Description:
${selfdescribe}

Job Description:
${jobdescribe}

Analyze the candidate's profile against the job description and generate:
1. Match score
2. Technical interview questions
3. Behavioral interview questions
4. Skill gaps
5. Day-wise preparation plan
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",

        contents: prompt,

        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    const report = JSON.parse(response.text);

    console.log(report);

    return report;
}

module.exports = generateInterviewReport;