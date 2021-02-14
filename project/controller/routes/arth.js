let isLogger=(req,resp,next)=>{
    if(req.session.anyName){
        next()
    }
    else{
        resp.redirect('/login')
    }
}

export default{isLogger}