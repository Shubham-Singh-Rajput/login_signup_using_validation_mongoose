const mongoose=require("mongoose")

let bookSchema=mongoose.Schema({
    Btitle:String,
    body:String,
    pre_login_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
})

export let blog=mongoose.model("blog",bookSchema)