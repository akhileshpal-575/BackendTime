const express = require("express")
const users = require("./MOCK_DATA.json")

const mongoose = require("mongoose")
const fs = require("fs");
const { stringify } = require("querystring");

const app = express();
const PORT = 8000;

//schema 
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName :{
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    jobTitle :{
        type : String,
    },
    gender :{
        type : String,
    },  
},
{timestamps : true }
) 
// connecting 
mongoose.connect('mongodb://localhost:27017/learing-Backend')
.then(console.log("connected MongoDb"))
.catch(err=> console.log('mongodb error'))
// model
const User = mongoose.model("user",userSchema) 
//built in middleware
app.use(express.urlencoded({extended:false}))

//middleware
app.use((req,res,next)=>{
    console.log("respond from middleware1")
    fs.appendFile('log.txt',`\n${Date.now()} ${req.ip} : ${req.method} :${req.path}`,(err,data)=>{
        next()
    })
})

//Rest Api's
app.get("/api/users",(req,res)=>{
    res.setHeader("X-myName",'Akhil') //custom header
    //always add X to custom header
    return res.json(users);
})



// app.get('/api/users/:id',(req,res)=>{
// const id = Number(req.params.id);
// const user = users.find((user)=> user.id === id);
// return res.json(user)
// })
// app.patch('/api/users/:id',(req, res)=>{
//     // Todo : Edit user 
//     return res.json({status:"panding"})
// })
// app.delete('/api/users/:id',(req, res)=>{
//     // Todo : Delete user
//     return res.json({status:"panding"})
// })

//Because all these above methods have same route so merge all

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id)
    return res.json(user)
}).patch((req,res)=>{
    // Todo: Edit user
    return res.json({status:"pending"})
}).delete((req,res)=>{
    // Todo: delete user
    return res.json({status:'pending'})
})
app.post('/api/users/', async (req,res)=>{
    //Todo: create new user
    const body = req.body
    if(!body||!body.first_name||!body.last_name||!body.gender||!body.email||!body.job_title){
     return res.status(400).json({msg : 'all field are req....'})
    }
  const result = await User.create({
   firstName : body.first_name,
   lastName : body.last_name,
   email : body.email,
   gender : body.gender,
 })
 return res.status(201).json({msg : "success"})
})
app.listen(PORT,()=> console.log(`server started at PORT 8000`))
