import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { IFollow, IUser, IUserProfile } from '../models/user.mode';
import { log } from 'console';
import connection from '../config/db';



export const follow=async(req:Request,res:Response)=>{
    console.log("follw opration start");
    const followingId:number=parseInt(req.params.userId as string)
    try {
        const followerId:number=(req.user as IUser).userId  as number;
        
        const follow:IFollow={
            followerId:followerId,
            followingId:followingId
        }

        await userService.follow(follow);;

        res.status(200).json("follw success fully")

    } catch (error) {
        console.log("errror during folloow ",error);
        res.status(500).json("fail to follow")
    }
    
}


export const unFollow=async(req:Request,res:Response)=>{
    console.log("un follw opration start");
    const followingId:number=parseInt(req.params.userId as string)
    try {
        const followerId:number=(req.user as IUser).userId  as number;
        
        const follow:IFollow={
            followerId:followerId,
            followingId:followingId
        }

        await userService.unFollow(follow);;

        res.status(200).json("unfollw success fully")

    } catch (error) {
        console.log("errror during unfolloow ",error);
        res.status(500).json("fail to unfollow")
    }
    
}


export const getAllUser=async(req:Request,res:Response)=>{
    console.log("get all user");
    try {
        const users:IUser[]=await userService.getAllUser();

        res.status(200).json(users)
        
    } catch (error) {
        console.log("error during gettting all user",error);
        res.status(500).json("un able to find user")
    }
    
}




export const findUserProfileByUserId=async(req:Request,res:Response)=>{
    console.log("getting userProfile");
    try {
        let userId:number=parseInt(req.query.userId as string);
        let isFollow=false;
        if(!userId){
                userId=(req.user as IUser).userId as number
        }else{
            isFollow=await userService.isFollow(userId as number,(req.user as IUser).userId as number)
        }

        const user=await userService.findByUserId(userId as number);
        const userProfile=await userService.findUserProfileByUserId(userId as number)

        console.log(user);
        console.log(userProfile);
        

        res.status(200).json({user:user,userProfile:userProfile,loggedInUserId:(req.user as IUser).userId,isFollow:isFollow})

    } catch (error) {
        console.log("error during userprofile",error);
        res.status(500).json("can not find userprofile")
        
    }
    
}


export const saveUserProfile=async(req:Request,res:Response)=>{
    console.log("save userProfile");
    try {
        (await connection).beginTransaction();
        const body=req.body;

        const file:any=req.files;

        // console.log(file[0].path);
        // console.log(file[1].path);

        const userProfile:IUserProfile={
            userId:(req.user as IUser).userId as number,
            userCoverImageUrl: `/upload/${file[0].originalname}`,
            userProfilePicUrl:`/upload/${file[1].originalname}`,
            userBio:body.userBio
        }
                
       const user:IUser={
        userFullName:body.userFullName,
        userName:body.userName,
        userEmail:body.userEmail,
        userId:(req.user as IUser).userId as number
       }

            await userService.updateUser(user);
        await userService.updateUserProfile(userProfile);
        



   

       
    //    const userProfile:IUserProfile={
    //      userProfilePicUrl :
    //    }
    (await connection).commit()
     res.status(200).json("profile udate success fully")   
        
    } catch (error) {
        console.log("error during save userProfile",error);
        (await connection).rollback();
        res.status(500).json("profile not updated")
    }
    
}



export const userProfile=async(req:Request,res:Response)=>{
        console.log("getiing userProfile");
        try {
            let userId:number=parseInt(req.query.userId as string);
            if(!userId){
                userId=(req.user as IUser).userId as number
            }

            if(!userId){
                res.status(404).json("user not found")
            }

            const userProfile=await userService.findUserProfileByUserId(userId);
            
            res.status(200).json({
                user:req.user,
                userProfile:userProfile
            })
        } catch (error) {
            console.log("can not get userProfile");
            res.status(500).json("can not found user profile")
            
        }
        
}