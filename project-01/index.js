const express = require("express")
const users = require("./MOCK_DATA.json")

const fs = require("fs")

const app = express();
const PORT = 8000;

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
app.post('/api/users/',(req,res)=>{
    //Todo: create new user
    const body = req.body
    users.push({...body,id:users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:'succes',id:users.length})        
    })
})
app.listen(PORT,()=> console.log(`server started at PORT 8000`))
