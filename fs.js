const fs = require("fs")

//sync .........Blocking request 
// fs.writeFileSync("./test.txt","hey there ")

//Async. . ..... Non-Blocking request
// fs.writeFile("./test.txt","hello",(err)=>{})


// const result = fs.readFileSync("./contacts.txt",'utf-8')
// console.log(result);

// read file async,return nothing because its void type
// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//  if(err){
//     console.log("Error",err)
//  }
//  else{
//     console.log(result)
//  }
// })

fs.appendFileSync("./test.txt",`${Date.now()}hey there\n`)
//copy
// fs.cpSync('./test.txt',"./copy.txt")

//delete
// fs.unlinkSync("./copy.txt")
 
