const express = require("express")
const { connectMongoDb } = require("./connection");
const {logReqRes} = require("./middleware");
const userRouter = require("./routes/user");
const app = express();
const PORT = 8000;
 

// connection
connectMongoDb('mongodb://localhost:27017/learing-Backend')
.then(()=>console.log("mongoDb connected"))

//built in middleware
app.use(express.urlencoded({extended:false}))
app.use(logReqRes('log.txt'))

// Routes
app.use('/api/users',userRouter);
app.listen(PORT,()=> console.log(`server started at PORT 8000`))
