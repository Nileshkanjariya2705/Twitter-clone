import bcrypt from 'bcrypt'
import { IPayload } from '../models/user.mode';
import jwt from 'jsonwebtoken'

import cloudinary from '../config/cloudinary';



const round:number=parseInt(process.env.ROUND as string) as number;

const jwtSecretKey:string=process.env.ACCESS_TOKEN_SECRET as string

export const createOtp=()=>{
    return Math.floor(Math.random()*1000000);
}



export const genrateHash=async(plainText:string)=>{
    console.log("----encode the text using bcrypt--");
    return await bcrypt.hash(plainText,round)   
}

export const compareHash=async(plainText:string,hashText:string)=>{
    console.log("--comparing  text in bcript");
    return await bcrypt.compare(plainText,hashText);
}


export const sendOptViaMail=async(otp:number,otpId:number)=>{
    console.log("--sending opt--");
}

export const checkValidity=(time:string)=>{
    console.log("ckeck otp validity");
    
    const genrationTime=new Date(time).getTime();
    const currentTime=new Date().getTime();
    const offset=100*60*2;

    return (genrationTime+offset) > currentTime
    
}



export const genrateJwtToken=(payload:IPayload)=>{
    
    console.log("genrating user jwt token");
    const accessToken=  jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1d'})
    
    const refereshToken=  jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET as string,{expiresIn:'7d'})
    return {accessToken, refereshToken}
}


export const verifyJwtToken=(token:string)=>{
    console.log("verify jwt token");
    return  jwt.verify(token,jwtSecretKey);
    
}



import fs from 'fs';

export const uploadImage = async (path: string) => {
   return await cloudinary.uploader.upload(path);
   
};


export const genrateUserName=(name:string)=>{
    return `${name}+123`
}


