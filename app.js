//create express application
const express= require('express')
const myApp = express()
//create mongoose library
const mong = require('mongoose')
//parse the data to json format
const bodyParser = require('body-parser')
myApp.use(bodyParser.json())
// create a file dotenv
require('dotenv/config')
const pitzzaRoute = require('./route/pitzza')
myApp.use('/api/pitzza',pitzzaRoute)
const userRoute=require('./route/auth')
myApp.use('/api/user',userRoute)
const postRoute= require('./route/posts')
myApp.use('/api/posts',postRoute)
mong.set("strictQuery", false);
//connecting with database
mong.connect(process.env.myDbConnector).then(()=>{
console.log(' MongoDb Connected')
}).catch(()=>{
    console.log('Error')
})
 //create a server 
 myApp.listen(3000,()=>{
    console.log('server is running')
})