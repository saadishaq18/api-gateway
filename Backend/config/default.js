const dotenv = require('dotenv')
const path = require('path')

const envFilePath = path.resolve(__dirname, `../.env.development`)
dotenv.config({path: envFilePath})

module.exports ={
    port: process.env.PORT || 3001,
    mongoURI: process.env.MONGO_URI,
    timeZone: process.env.APP_TIMEZONE,
    language: process.env.APP_LANGUAGE,
    jwtSecret: process.env.JWT_KEY
}