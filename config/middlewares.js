const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use(express.static('.'))
    app.use(express.json())
    app.use(morgan('dev')) 
}