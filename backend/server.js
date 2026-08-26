require("dotenv").config();

const app = require("./src/app.js");
const connectToDb = require("./src/config/database.js");

const generateInterviewReport = require("./src/services/ai.service.js");

const {
    resume,
    selfdescribe,
    jobdescribe
} = require("./src/services/temp.js");

connectToDb();

generateInterviewReport({
    resume,
    selfdescribe,
    jobdescribe
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});