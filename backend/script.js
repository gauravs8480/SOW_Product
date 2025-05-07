const   express = require('express')
const userModle=require("./db")
const app = express()
const port = 3000
const session=require("express-session")
const cookieParser=require("cookie-parser")

app.use(cookieParser());
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:"gauravsehrawat"

}))

app.get('/',async (req, res) => {

const createdUser=await userModle.create({    
    username:"gaurav",
    name:"sehrawat",
    age:21
});
res.send(createdUser)
  // res.render("index")

})

app.get('/users',async(req,res)=>{
  const user=await userModle.findOne({username:"gaurav"})
  console.log(user)
  res.send(user)
})

app.get('/delete',async(req,res)=>{
 const deltedUser = await  userModle.findOneAndDelete({username:"gaurav"})
  res.send(deltedUser)

})

app.get('/cookie', function(req, res) {
  res.cookie("name", "gaurav");
  //  
  res.send("Cookie has been set");
  console.log("Cookies: ", req.cookies);
});


app.get('/readcookie', function(req, res) {

  console.log("Cookies: ", req.cookies);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


 