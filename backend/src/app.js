const expreess = require('express')
const cookieParser=require('cookie-parser')
const cors =require('cors')

const app = expreess()

app.use(expreess.json())
app.use(cookieParser()) 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//require all the route here
const authRouter = require('./routes/auth.routes')

//using all the routes here
app.use('/api/auth', authRouter)

module.exports = app 