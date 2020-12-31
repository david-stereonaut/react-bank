const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const api = require('./server/routes/api')
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-bank")
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})