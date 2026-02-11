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

const UserSchema=new mongoose.Schema({
    email:{type:String,
        required:true,
        unique:true
    },
    password:{type:String,
        required:true,
    }
})

module.exports=mongoose.model("user",UserSchema)
    