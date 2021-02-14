const { check, validationResult, body } = require("express-validator")
import  path  from 'path';
import { blog } from '../model/schema/blog';
import { user } from '../model/schema/schema';
const layout = path.join("layout","body.hbs")
const mongoose=require("mongoose")

const bcrypt=require("bcrypt")
let blogs={
    blogss(req,resp){
        resp.render("blogs.hbs",{
            layout:"layout/body.hbs",
            title:"blogs"
        })
    },
    async blogspost(req,resp){
        let errors=validationResult(req)
        if(!errors.isEmpty()){
            // console.log(errors.array())
            let  error={}
            // console.log(req.body,"ye hai body")
            // console.log(errors.array(),"babahr")
            for(let i=0;i<errors.array().length;i++){
                console.log(errors.array()[i],"loop ke")
                if(errors.array()[i].value.length==0){
                    error[errors.array()[i].param]=errors.array()[i].msg
                }
            }
            // console.log(error)
            // console.log(req.body)
            return resp.render("blogs.hbs",{
                ...req.body,
                error,
                title:"blogs",
                layout
            })
        }
        console.log(req.session.anyName)
        let blog_Save=new blog({
            ...req.body,
            pre_login_id:req.session.anyName
        })
        await blog_Save.save()
        resp.redirect('/userblocks')
    },
    async showBlog(req,resp){
        let all_Profile=await user.aggregate([{
            $match:{
                "_id":mongoose.Types.ObjectId(req.session.anyName)
            }
        },{
            $lookup:{
                from: "blogs",
                localField: "_id",
                foreignField: "pre_login_id",
                as: "data"
              }
        }])
        // console.log(all_Profile)
        resp.render("output.hbs",{
            USER:all_Profile,
            title:"BLOCS",
            layout:"/layout/body.hbs"
        })
    }
}
export default{blogs}