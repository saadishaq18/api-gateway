const express = require('express')
const config = require('./config/default')
const connectDB = require('./config/database')
const routes = require('./routes/index')


const app = express()

connectDB()
const port = config.port

//routes
app.use('/api',routes)

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})