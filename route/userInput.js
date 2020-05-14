const express = require('express')

const bcrypt = require('bcryptjs')

const userRoute = express.Router()

// require schema
let userSchema = require('../schema/userModel')

//create user
userRoute.route('/register-user').post(async(req,res) =>{
    try{

        userName = req.body.userName
        password = req.body.password
        console.log(userName)

        password = bcrypt.hashSync(req.body.password , 10)

        let newUser = new userSchema({userName:userName ,password:password})

        let result = await newUser.save()
        
        res.send(result)

    }catch(error){

        res.send(error)
    }

   
})

//login user
userRoute.route('/login-user').post(async(req,res) => {
    try{
        var user = await userSchema.findOne({userName : req.body.userName})

        if(!user){
          return   res.status(400).send({message :'User does not exist'})
        }

        if(!bcrypt.compareSync(req.body.password , user.password)){

            return  res.status(400).send({message : 'The password is invalid'})
        }

        res.send({message:'The Username and password combination is coreect!!'})

    } catch(error){

        res.send(error)
    }
})

//get user
userRoute.route('/get-user').get(async(req,res) => {
    try{

        let displayResult = await userSchema.find().exec()
        res.send(displayResult)
 
    }catch(error) {
        res.status(500).send(error)

    }

})

module.exports = userRoute