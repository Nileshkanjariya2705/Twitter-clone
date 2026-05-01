import e, { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { ILogin, IMedia, IOtp, IPayload, ITweet, IUser } from '../models/user.mode';
import * as helper from '../common/helper.common';
import { ResultSetHeader } from 'mysql2';
import { use } from 'passport';
import * as authService from '../services/auth.service'
import * as tweetService from '../services/tweet.service'
import connection from '../config/db';
import path from 'path';
import  {getOtp}  from '../common/otpManage';
import { identifier } from './view.controller';



export const sendOtp=async(req:Request,res:Response)=>{
    console.log("--------------genrate OPT--------------------");
    try {
        // optBody
        // {
        //   "identifier": "dhruv@gmail.com",
        //   "purpose": "SIGNUP"
        // }

        
        const optBody=req.body;
        console.log(optBody);
        
        // genrate otp
        const otp:number=helper.createOtp();

        // create hash
        // const otpHash:string=await helper.genrateHash(otp.toString() )

        // console.log(otpHash);
        // optBody.otp_hash=otpHash;
        // console.log(optBody);

        // save otp in database
        const result:ResultSetHeader = await  authService.addOtpTODatabase({
            identifier:optBody.identifier,
            otp_hash:otp.toString()
        } as IOtp);

        // last inserted id
        const otpId:number=result.insertId;

        console.log("otp is:",otp,"otpId:",otpId);
        

        // otp send to user 
        helper.sendOptViaMail(otpId,otp)

        res.status(201).json({
            msg:"otp sent success fully",
            otpId:otpId
        });
      
    } catch (error) {
        console.log("error during genrate otp:",error);
        res.status(500).json("can not genrate otp");
        
    }
    
}


export const optVerification=async(req:Request,res:Response)=>{
    console.log("opt verification start");
//     {
//     "otpId":"2",
//     "otp_hash":"809782"
//        }
    try {
        const otpBody:IOtp=req.body;
        console.log(otpBody);
        const databaseOtp:IOtp[]=await authService.findOtpById(otpBody.otpId);
        
        console.log(databaseOtp);
        
        const isOtpExpire :boolean = helper.checkValidity(databaseOtp[0]?.genrateTime as string)

        if(!isOtpExpire){
            res.status(404).json("otp is expire");
            return;
        }
        
    //    const isValid =await helper.compareHash(otpBody.otp_hash,databaseOtp[0]?.otp as string )
       
        if(otpBody.otp_hash===databaseOtp[0]?.otp ){
            console.log("otp is correct");
            
            res.status(200).json("otp is valid")
        }else{
            res.status(404).json("invalid otp")
        }
        
    } catch (error) {
        console.log("error during otp check otp",error);
        res.status(500).json("error to compare otp")
    }
    
}


export const isUserNameExist=async(req:Request,res:Response)=>{
    console.log("ckeck user name exist or not in database");
    try {
        const  body:{userName:string}=req.body;
        
       const databaseResponse= await userService.findUserName(body.userName);
       console.log(databaseResponse);
       if(databaseResponse.length>0){
        res.status(200).json("this user name already tekon")
        return
       }else{
        res.status(404).json("user name not exists")
       }
    } catch (error) {
        console.log("error during chekck username in database:",error);
        res.status(500).json("database error for check user Name")
    }
    
}

export const saveUser=async(req:Request,res:Response)=>{
    console.log("---add user to database----");
    try {
        const user:IUser=req.body;
        console.log(user);

        const identifier=user.identifier;

        if(identifier?.includes('@')){
            user.userEmail=identifier
        }else{
            user.userPhoneNumber =identifier as string;
        }
        
        // encrypt password
        const password_hash:string=await helper.genrateHash(user.userPassword as string);
        user.userPassword=password_hash;
        user.provider='EMAIL'
        const databaseResponse= await userService.createUser(user);


        const lastInsertedId:number=databaseResponse.insertId;

        await authService.createUserProfile(lastInsertedId)
        // const databaseUser:IUser[]=await userService.findByUserId(lastInsertedId);

        const payload:IPayload={
             userId:lastInsertedId,
             userName:user.userName as string
        }

        const {accessToken,refereshToken}=helper.genrateJwtToken(payload)

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:true,
            maxAge:24*60*60*1000
        })

        await authService.saveRefreshTokenInDB(lastInsertedId,refereshToken)

        res.status(201).json("user created successFully")
        
    } catch (error) {
        console.log("error during save user in database:",error);
        res.status(500).json("data not inserted")
        
    }
    
}



export const login=async(req:Request,res:Response)=>{
    console.log("login check");
    try {
        const body:ILogin=req.body;
        console.log(body);
        
        const inputValue=body.identifier;

        let databaseResponse:IUser[];

        if(inputValue.includes('@')){
            console.log("email");
            
           databaseResponse=await userService.findUserEmail(inputValue);
            
        }else if(/^\d{10}$/.test(inputValue)){
            console.log("phone number");

            databaseResponse=await userService.findUserPhoneNumber(inputValue)
            
        }else{
            console.log("username");

            databaseResponse=await userService.findUserName(inputValue)
        }

        if(databaseResponse.length===0){
            res.status(404).json("user not found")
            return;
        }
        console.log(databaseResponse);
        
        const password_hash: string =databaseResponse[0]?.userPassword as string;
        // console.log(password_hash,"password hash");
        // console.log(body.userPassword,"password hash");
        
        const isPasswordCorrect=await helper.compareHash(body.userPassword,password_hash);

        if(isPasswordCorrect){
            console.log('true');
            
            const payload:IPayload={
             userId:databaseResponse[0]?.userId as number,
             userName:databaseResponse[0]?.userName as string
            }
         

            const {accessToken,refereshToken}=helper.genrateJwtToken(payload);
            res.cookie("accessToken",accessToken,{
                httpOnly:true,
                secure:true,
                maxAge:24*60*60*1000
            })
            await authService.saveRefreshTokenInDB(databaseResponse[0]?.userId as number,refereshToken)
            res.status(200).json("login success fully")
        }else{            
            res.status(404).json("invalid credintials")
        }
        
    } catch (error) {
        console.log("error during login",error);
        res.status(500).json("login fail")
        
    }
    
}


export const uploadImage=async(req:Request,res:Response)=>{
    console.log("image uploading start");
    try {
        
        const url=await helper.uploadImage("/home/nilesh-kanjariya/twitter clone/Twitter/public/photos/twitter_Logo.png")
        if(url){
            res.status(404).json("image not upload")
        }else{
             console.log(url);
          res.status(200).json(url)
       
        }
        
    } catch (error) {
        console.log("image uploading error",error);
        
        
    }
    
}

export async function googleCallBack(req:Request,res:Response) {
   try {
        const user:IUser=req.user as IUser;
        const payload:IPayload={
            userId:user.userId as number,
            userName:user.userName as string
        }

        const {accessToken,refereshToken}= helper.genrateJwtToken(payload)

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            maxAge:60*60*1000*24,
            secure:true
        })
        await authService.saveRefreshTokenInDB(user.userId as number,refereshToken);

        res.redirect('/user/dashboard')    
   } catch (error) {
    console.log("google callback",error);
    res.status(500).json("can not redirect in dashboard")
   }
}


export async function sendOtpToUi(req:Request,res:Response) {
    console.log("get otp=");
    const otpId=parseInt(req.query.otpId as string)

    console.log(otpId);

    const otp:IOtp[]= await authService.findOtpById(otpId );
    
    
  
    res.status(200).json((otp[0] as any).otp)
}

export async function updatePassword(req:Request,res:Response) {
    console.log("updating password");
    try {
        const body=req.body;
        console.log(body);
        const token=req.cookies.resetToken

        const payload:any= helper.decodeToken(token);
        console.log(payload);
        
        
        const password_hash=await helper.genrateHash(body.newPassword)

        await userService.updatePassword(payload.userId,password_hash)

        res.status(200).json(" passsword updated successfully")
        
    } catch (error) {
        console.log("errro during update password",error);
        res.status(500).json('password not updated')
        
    }
    
}
export async function forgotPassword(req:Request,res:Response) {
    console.log("fotgot password");
    try {
        const body=req.body;
        const userEmail=body.userEmail;

        const user:IUser[]=await userService.findUserEmail(userEmail);

        if(user && user.length>0){
            const otp= helper.createOtp();
            
            const result= await authService.addOtpTODatabase({
                identifier:user[0]?.userEmail,
                otp_hash:otp.toString() ,
            } as IOtp)
          helper.sendOptViaMail(otp,result.insertId)  

          const {accessToken,refereshToken}=helper.genrateJwtToken({
              userId: user[0]?.userId as number,
              identifier: user[0]?.userEmail as string
          } as any)

          console.log(accessToken);
          

          console.log(result.insertId);
          
          res.cookie('resetToken',accessToken,{
            httpOnly:true,
            secure:true,
            maxAge:60*1000*15
          })
          
          res.status(200).json(result.insertId)
            
        }else{
            res.status(404).json("email not found")
        }

        
    } catch (error) {
        console.log("error to forgot password");
        res.status(500).json("some thing went worong");
        
    }
    
}



export const checkOpt=async(req:Request,res:Response)=>{
    console.log("opt verification start");
//     {
//     "otpId":"2",
//     "otp_hash":"809782"
//        }
    try {
        const otpBody:IOtp=req.body;
        console.log(otpBody);
        const databaseOtp:IOtp[]=await authService.findOtpById(otpBody.otpId);
        
        console.log(databaseOtp);
        
        const isOtpExpire :boolean = helper.checkValidity(databaseOtp[0]?.genrateTime as string)

        if(!isOtpExpire){
            res.status(404).json("otp is expire");
            return;
        }
        
     
        if(otpBody.otp_hash===databaseOtp[0]?.otp ){
            console.log("otp is correct");
            
            res.status(200).json("otp is valid")
        }else{
            res.status(404).json("invalid otp")
        }
        
    } catch (error) {
        console.log("error during otp check otp",error);
        res.status(500).json("error to compare otp")
    }
    
}



export const isEmailExists=async(req:Request,res:Response)=>{
    console.log("check user email in database");
    try {
        const body=req.body;
        const user= await userService.findUserEmail(body.userEmail);
        if(user.length>0){
            console.log("true");
            
            res.status(200).json(true)
        }else{
            res.status(404).json(false)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
        
    }
    
}