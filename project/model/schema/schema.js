const mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    name:String,
    password:String,
    email:String,
    date:{
        type:Date,
        default:Date.now()
    }
})

export let user=mongoose.model("user",userSchema)