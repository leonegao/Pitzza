const mong = require('mongoose')

const schemaPitzza = mong.Schema({
    pitzza_name:{
        type:String
    },
    pitzza_type:{
        type:String
    }
})

module.exports = mong.model('pitzza',schemaPitzza)

/* Add data to the database 
 const collection= new mong.model('pitzza',schema)
data={
    pitzza_name:'Margarita',
    pitzza_type:'cheese and tomatoes'
    
}
 collection.insertMany([data])*/
