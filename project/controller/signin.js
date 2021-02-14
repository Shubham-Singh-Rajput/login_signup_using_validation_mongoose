const { check, validationResult } = require("express-validator")
import  path  from 'path';
import { user } from '../model/schema/schema';
const layout = path.join("layout","body.hbs")
const bcrypt=require("bcrypt")
let s={
    signin(req,resp){
        resp.render("signin.hbs",
        {
            layout:"/layout/body.hbs",
            title:"signIN"
        })

    },
    async signinpost(req,resp){
        let pre_Exist_user=await user.findOne({email:req.body.email})
        if(!pre_Exist_user){
            return resp.redirect('/login')

        }
        console.log(pre_Exist_user,req.body.password)
        let password_check=await bcrypt.compare(req.body.password,pre_Exist_user.password)
        if(!password_check){
            let error={}
            error.password="enter the correct password"
            return resp.render("signin.hbs",{
                ...req.body,
                error,
                layout:"/layout/body.hbs",
                title:"signIN"
            })
        }
        // console.log(req.session)
        req.session.anyName=pre_Exist_user._id
        // console.log(req.session.anyName)
        return resp.redirect('/blogs')
    }
}
export default{s}