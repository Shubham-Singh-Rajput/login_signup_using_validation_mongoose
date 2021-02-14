const express=require("express")
import routes from "../allroutes"
import blogRoute from "../blogroute"
const { check, validationResult } = require("express-validator")
const route=express.Router()
import signin from '../signin';
import arth from "./arth"

// console.log(routes)
route.get('/login',routes.d.login)
route.post('/login',[
check("name","enter the name").not().isEmpty(),
check("email","enter the email").isEmail(),
check("password","enter  the password of length 6").isLength({min:6})
],routes.d.postlogin)

route.get('/signin',signin.s.signin)
route.post('/signin',signin.s.signinpost)
route.get('/blogs',arth.isLogger,blogRoute.blogs.blogss)
route.post('/blogs',[
    check("Btitle","enter the title").not().isEmpty(),
    check("body","enter the body").not().isEmpty()
    ],blogRoute.blogs.blogspost)

route.get('/userblocks',arth.isLogger,blogRoute.blogs.showBlog)
export default{route}