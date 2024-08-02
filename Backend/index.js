const express = require('express')
const config = require('./config/default')
const connectDB = require('./config/database')
const routes = require('./routes/index')
const {errorHandler} = require('./middlewares/errorHandler')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()
const port = config.port

//routes
app.use('/api',routes)

//Error Handling
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})