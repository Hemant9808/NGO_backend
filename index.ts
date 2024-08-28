import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
 const port = 3000;


 const corsOptions ={
   origin:true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
   optionsSuccessStatus: 204,
 }
 app.use()


 app.get('/test',(req,res)=>{
    res.send('this message comming form ngo backend...')
 })
dotenv.config();

const MONGO_URI=process.env.MONGO_URI as string
console.log("MONGO_URI",MONGO_URI);

const connect = mongoose.connect(MONGO_URI)
.then(()=>{
   console.log("db connected");
   
}).catch((error)=>{
   console.log("db error:",error);
   
})


 app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
 })