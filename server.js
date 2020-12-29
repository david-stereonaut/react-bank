const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
})
const api = require('./server/routes/api')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-bank")
const port = 3001
app.listen((process.env.PORT || port), function() {
    console.log(`Server running on port ${port}`)
})