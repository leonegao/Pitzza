//create a schema 
const mong=require('mongoose')
const schemaUser= mong.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:256
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1024
    },
})
module.exports=mong.model('users',schemaUser)


/* Add data to the database 
 const collection= new mong.model('cloudComputer',schema)
data={
    username:'Leo',
    email:'leonegao@gmail.com',
    password:'123456'
}
 collection.insertMany([data])*/
