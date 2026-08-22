const expreess = require('express')
const cookieParser=require('cookie-parser')

const app = expreess()

app.use(expreess.json())
app.use(cookieParser()) 

//require all the route here
const authRouter = require('./routes/auth.routes')

//using all the routes here
app.use('/api/auth', authRouter)

module.exports = app 