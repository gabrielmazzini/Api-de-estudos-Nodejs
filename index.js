require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const consign = require('consign')

const { restart } = require('nodemon')

const app = express()

consign()
        .include('./config/passport.js')
        .include('./config/multer.js')
        .then('./config/middlewares.js')
        .then('./api')
        .then('./config/routes.js')
        .into(app)

// database connection
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASS

mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.eqlxipw.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
app.listen(3001)
console.log('server running')
})
.catch((err) => {
console.log(err)
})


