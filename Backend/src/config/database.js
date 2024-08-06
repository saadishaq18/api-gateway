const mongoose = require('mongoose')
const config = require('@config/default')
const dotenv = require('dotenv')

//Connecting to Database
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log("Connected to DB")
    } catch (error) {
        console.error("Error occur in connecting DB", error)
        process.exit(1)
    }
}

module.exports = connectDB

