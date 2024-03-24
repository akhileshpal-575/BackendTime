//http built in module
const http = require("http");
const fs = require("fs");

//req contain meta data of who is requesting.
const myServer = http.createServer((req,res)=>{
 const log = `${Date.now()} : ${req.url} New Req Recieved\n`
fs.appendFile("log.txt",log,(err,data)=>{
switch(req.url){
    case "/":
        res.end("HomePage");
        break;
    case "/about":    res.end("i am akhilesh pal")
    break;
    default:
        res.end("404 not found")



}
})
});
myServer.listen(8000,()=>console.log("Server Started")) 