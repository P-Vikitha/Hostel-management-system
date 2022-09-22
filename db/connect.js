const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/hostel",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection set");
}).catch((e)=>{
    console.log(e)
})

