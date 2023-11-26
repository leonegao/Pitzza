const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    topic :{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    hashtag:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
         require:false
        },
    not_likes:{
         type:Number,
         require:false
            },
    comments:{
        type: String,
        default: [],
             },
    message:{
        type: String,
        default: [],
             },
    expired: {
         type: Boolean,
         default: false,
              },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('posts',PostSchema)
/* Add data to the database */
/* const collection= new mongoose.model('posts',PostSchema)
data={
    user:"Leo",
    title:"Hello Pitzza",
    text:"I love eat pitzza",
    hashtag:"#Pitzza",
    location:"London",
    url:"http://lol.com"
    
}
 collection.insertMany([data])*/
 