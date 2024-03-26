const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    return res.send("hello from the server")
})

app.get("/about",(req,res)=>{
    return res.send("i'm akhilesh")
})
app.listen(8000,()=>console.log("server started"))