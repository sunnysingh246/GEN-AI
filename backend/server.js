require("dotenv").config();
const app = require('./src/app.js')
const connectToDb = require('./src/config/database.js')
const invokeGeminiAi=require('./src/services/ai.service.js')

connectToDb()
invokeGeminiAi()

app.listen(3000, () => {
    console.log("server is runnng on port 3000")
})