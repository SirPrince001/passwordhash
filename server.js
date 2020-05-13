const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
//const bcrypt = require('bcryptjs')
// require the database
const config_DB = require('./db/database')

// get the user route
const userRoute = require('./route/userInput')

const app = express()
//connect to DB
mongoose.connect(config_DB.db , {useNewUrlParser:true , useUnifiedTopology:true}).then(() => {

    console.log('Connected to Database!!')
}, error => {
    console.log('Failed to connect to Database' + error)
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended:false}))
app.use(cors())
app.use(userRoute)



app.listen(3000 , () => {
    console.log('Connecting... to the Database  at port 6000')
})