import passport from "passport";

import {Strategy as GoogleStratergy} from 'passport-google-oauth20'
import  Jwt  from "jsonwebtoken";
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt'
import { IPayload, IUser } from "../models/user.mode";
import * as userService from '../services/user.service'
import * as authService from '../services/auth.service'
import { addTweet } from '../services/tweet.service';
import * as helper from '../common/helper.common'
import { Response } from "express";


passport.use(new GoogleStratergy({
    clientID:process.env.GOOGLE_CLIENT_ID as string,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL:'/auth/google/callback',
    scope:["profile",'Email']
},async(accessToken,refreshToken,profile,done)=>{
    console.log("googl authentication start");
    try {
        
        const userFullName:string=profile.displayName;
        const userEmail:string=(profile.emails as any)[0]?.value;
        const userProfilePic:string=profile.profileUrl;
        const provider:string=profile.provider;
        const providerId:string=profile.id;

        const googleUser:IUser={
            userFullName:userFullName,
            userName:helper.genrateUserName((profile.name)?.givenName as string),
            userEmail:userEmail,
            provider: provider as 'GOOGLE',
            providerId:providerId
        }

          const user:IUser[]=  await userService.findUserEmail(userEmail);
         
          if(user.length>0){
              done(null,user[0]);
            }else{
                const result =await  userService.createUser(googleUser)
                await authService.createUserProfile((user[0] as IUser).userId as number)
           googleUser.userId=result.insertId;

           const payload:IPayload={
            userId:result.insertId,
            userName:googleUser.userName
           }
            done(null,googleUser);
          } 
        
    } catch (error) {
        console.log("error during google authentication",error);
        done(null,false);
        
    }
    
}))

var cookieExtractor = function(req:any) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
};
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET as string
};
passport.use(new JWTStrategy(options,async function(payload:any,done:any){
    console.log("Passport middleware reached!");
    try {
        const user:IUser[]=await userService.findByUserId(payload.userId);
    
        if(user.length>0){
            
            
            return done(null,user[0]);
        }else{
            console.log("middleware fail");
            return done(null,false)
        }
    } catch (error) {
        console.log(error);
        done(null,false)
    }
       
}))

export default passport;