const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:true,
    
  },
  password:String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts'
  }
})
module.exports  = mongoose.model('users',userShema)