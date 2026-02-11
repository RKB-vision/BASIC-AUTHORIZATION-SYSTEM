require('dotenv').config();
const mongoose = require('mongoose');

const URL=process.env.URL

mongoose.connect(URL)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err)
    })

const TaskSchema=new mongoose.Schema({
    content:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

module.exports=mongoose.model("task",TaskSchema)
