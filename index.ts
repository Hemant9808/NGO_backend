import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appError } from './utils/error';
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import { createPost } from './controllers/postContoller';
const cors = require('cors');
const app = express();
 const port = 3000;


 const corsOptions ={
   origin:true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
   optionsSuccessStatus: 204,
 }

 app.use(cors());
 
 app.use(express.json());


 app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', "*");
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });
 

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

app.use("/",userRoutes)
 app.use("/",postRoutes)



app.all("*", (req, res, next) => {
   next(appError(`can't find ${req.originalUrl} on this server`, 404));
 });


 app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
 })
 