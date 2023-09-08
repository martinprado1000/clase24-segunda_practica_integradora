const mongoose = require('mongoose')

const producSchema = mongoose.Schema({
    code:{
        type:String,
        unique:true
    },
    stock:Number,
    title:String,
    price:Number

})

module.exports = mongoose.model('products', producSchema)