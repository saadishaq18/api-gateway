const express = require('express')
const config = require('./config/default')
const connectDB = require('./config/database')


const app = express()

connectDB()
const port = config.port

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})