const {GoogleGenAi}=require("@google/genai")

const ai=new GoogleGenAi({
    apiKey:process.env.GOOGLE_GRN_AI_API_KEY
})