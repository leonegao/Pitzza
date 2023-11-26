const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jsonwebtoken= require('jsonwebtoken')
//import the validation functions
const {registerValidation_joi,loginValidation_joi}=require('../validations/validationUser')
const bcryptjs =require('bcryptjs')
router.post('/register', async(req,res)=>{
    
    const {error}=registerValidation_joi(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }
    // check if the user email exist in the database 
    const userExistsInDb = await User.findOne({email:req.body.email})
    if(userExistsInDb){
        return res.status(400).send({message:'User already exists in database'})
    }
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)

    const user= new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const svUser= await user.save()
        res.send(svUser)
    }catch (error){
        res.status(400).send({message:error})

    }
})
router.post('/login', async(req,res)=>{
    //control validation
    const {error} = loginValidation_joi(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }
    // Validation 2 to check if user exists!
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    } 
    // Validation 3 to check user password
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Password is wrong'})
    }
    //returning the token 
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})
})
module.exports = router