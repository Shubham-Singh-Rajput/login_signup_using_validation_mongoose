import "babel-polyfill"
const mongoose=require("mongoose")
const mongoUri="mongodb://localhost:27017/Student"
const connect=async()=>{
    try{
    await mongoose.connect(mongoUri,{useUnifiedTopology: true,useNewUrlParser: true })
    console.log("connected")
}

    catch(e){
        console.log(e.message,"not connected")
    }
}

export default{
    connect
}