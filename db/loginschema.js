const mongoose=require("mongoose")

const mySchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true                     //email should be unique
    }
})

const logins=new mongoose.model("logins",mySchema)
module.exports=logins