const express = require('express')
const router = express.Router()

const Pitzza = require('../models/Pitzza')
const verifyToken = require('../verifyToken')

router.get('/',verifyToken, async(req,res) =>{
    try{
        const pitzza = await Pitzza.find() // request pitzza from database
        res.send(pitzza)
    }catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router