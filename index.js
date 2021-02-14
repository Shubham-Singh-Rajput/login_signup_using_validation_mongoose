import route from "./project/controller/routes/login"
import path from "path"
const server=require("express")
const session =require("express-session")
const cookiePraser=require("cookie-parser")
const app=server()
import bodyPraser from "body-parser"
import connection from "./project/model/connect"
app.use(cookiePraser())
app.use(session({
    secret:"keyboard cat",resave:true,saveUninitialized:true,cookie:{maxAge:60000}
}))

connection.connect()
app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))
app.set("view engine","hbs")
app.set("views",path.join(__dirname,"/project/view"))
app.use(server.static(path.join(__dirname,"/project/view")))

app.use(route.route)

app.listen(2000)