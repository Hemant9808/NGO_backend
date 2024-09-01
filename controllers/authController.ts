import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import { appError } from "../utils/error";
const key = process.env.SECRET_KEY
const signToken = (id :string)=>{
    if (!key) {
        throw appError("SECRET_KEY is not defined in the environment variables.",500);
      }
   const token=jwt.sign({id},key,{
    expiresIn:2000
   })
   return token;
}


export const  signup =async(req:any,res:any,next:any)=>{
       const {fullname,email,password}=req.body;
       if(!fullname|| !email|| !password){
        return next(
         appError("write correct credentials.",500))
       }
       const existingUser = await User.find({email})
       if(existingUser.length>0){
        return next(
            appError("write correct credentials.",500))
       }
       const newUser = await User.create({
        fullname,
        email,
        password,
        passwordConfirm:password
      });
      const token = signToken(newUser.id);

      

  res.status(201).json({ token, user:{
    fullname,
    email
  }});
}


 export const login = async(req:any,res:any)=>{
   const {email,password}=req.body;
   if(!email || !password){
    throw appError("write correct credentials.",500);
}
   const user = await User.findOne({email}).select("+password");
  
   if(!user || !await bcrypt.compare(password, user.password) ){
    throw appError("write correct credentials.",500);
    }
const token = signToken(user.id);
res.status(200).json({
    token,
    user

})
 }

//  export const login = async(req:any,res:any)=>{
//   console.log('akdak');
  
//  }

//   export const signup = async(req:any,res:any)=>{
//  console.log('skds');
 
//   }