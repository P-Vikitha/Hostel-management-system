const mongoose=require("mongoose")

const mySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Sid:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    date:{
        type:Date,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    plans:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true
    }
})

const bookings=new mongoose.model("bookings",mySchema)
module.exports=bookings