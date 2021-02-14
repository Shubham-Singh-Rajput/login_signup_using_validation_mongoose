const { check, validationResult } = require("express-validator")
import  path  from 'path';
import { user } from '../model/schema/schema';
const layout = path.join("layout","body.hbs")
const bcrypt=require("bcrypt")
let d={
    login(req,resp){
        let data={
            name:"",
            email:"",
            password:"",
            title:"login",
            layout
        }
        req.session.anyName=""
        resp.render("login.hbs",data)
    },
     async postlogin(req,resp){
        let errors=validationResult(req)
        if(!errors.isEmpty()){
            let length=errors.array().length
            console.log(errors.array())
            let error={}
            for(let i=0;i<length;i++){
                if(errors.array()[i].value.length==0){
                    error[errors.array()[i].param]=errors.array()[i].msg
                }
            }
            // console.log(error)
            return resp.render("login.hbs",{
                ...req.body,
                error,
                title:"login",
                layout
            })

        }
        // console.log(req.body.email)
        // console.log(user)
        let emailSearch=await user.find({email:req.body.email})
        // console.log(emailSearch)
        let error={email:"alredy exist"}
        if(emailSearch.length){
            return resp.render("login.hbs",{
                ...req.body,
                error,
                title:"login",
                layout
            })

        }
        let saveData=new user({
            ...req.body
        })
        const salt= await bcrypt.genSalt(10)
        saveData.password=await bcrypt.hash(req.body.password,salt)
        saveData.save()
        return resp.redirect('/signin')
        
    }
}

export default{d}