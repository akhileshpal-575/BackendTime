//http built in module
const http = require("http");

//req contain meta data of who is requesting.
const myServer = http.createServer((req,res)=>{
console.log("New Req Recieved")
res.end("hello from server")
});

