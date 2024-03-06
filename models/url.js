const mongoose = require('mongoose');
const {Schema}=require("mongoose")
const urlSchema=new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  shortId:{
    type:String,
    required:true,
    unique:true,
  },
  redirectURL:{
    type:String,
    required:true,
  },
  visitHistory:[{date:{type:Date}}]
},
{ timestamps: true }
);

const URL=mongoose.model("url",urlSchema);

module.exports=URL;