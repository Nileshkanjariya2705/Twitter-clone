import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { IFollow, IUser, IUserProfile } from '../models/user.mode';
import { log } from 'console';
import connection from '../config/db';
// import { follow } from './user.controller';



export const follow=async(req:Request,res:Response)=>{
    console.log("follw opration start");
    const followingId:number=parseInt(req.params.userId as string)
    try {
        const followerId:number=(req.user as IUser).userId  as number;
        
        const follow:IFollow={
            followerId:followerId,
            followingId:followingId
        }

        if(await userService.isFollow(follow)){
            await userService.unFollow(follow)

            res.status(200).json("unfollow success fully")
        }else{
            
        await userService.follow(follow);;

        res.status(200).json("follw success fully")
        }


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
    const userId=(req.user as IUser).userId
    try {
        const users:IUser[]=await userService.getAllUser(userId as number);

        res.status(200).json(users)
        
    } catch (error) {
        console.log("error during gettting all user",error);
        res.status(500).json("un able to find user")
    }
    
}




export const findUserProfileByUserId=async(req:Request,res:Response)=>{
    console.log("getting userProfile-------------------------------------");
    try {
        let userId:number=parseInt(req.query.userId as string);
        let isFollow=false;
        if(!userId){
                userId=(req.user as IUser).userId as number
        }else{
            const follow:IFollow={
                followerId:(req.user as IUser).userId as number,
                followingId:userId
            }
            isFollow=await userService.isFollow(follow)
            console.log("userFollow",isFollow);
            
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

export const saveUserProfile = async (req: Request, res: Response) => {
    try {
        const db = await connection;
        await db.beginTransaction();
        
        const body = req.body;
        const userId = (req.user as IUser).userId as number;
        
        // 1. Fetch current profile for fallbacks
        const userProfileRows: IUserProfile[] = await userService.findUserProfileByUserId(userId);
        const currentProfile :IUserProfile= userProfileRows[0] as IUserProfile;

        // 2. Handle files using field names
        // req.files will now be an object: { userCoverImage: [...], userProfilePic: [...] }
        const files:any = req.files as { [fieldname: string]: Express.Multer.File[] };

        const userCoverImageUrl = (files && files['userCoverImage']) 
            ? `/upload/${files['userCoverImage'][0].filename}` 
            : currentProfile.userCoverImageUrl;

        const userProfilePicUrl = (files && files['userProfilePic']) 
            ? `/upload/${files['userProfilePic'][0].filename}` 
            : currentProfile.userProfilePicUrl;

        const newUserProfile: IUserProfile = {
            userId: userId,
            userCoverImageUrl: userCoverImageUrl,
            userProfilePicUrl: userProfilePicUrl,
            userBio: body.userBio
        };

        const user: IUser = {
            userFullName: body.userFullName,
            userName: body.userName,
            userEmail: body.userEmail,
            userId: userId
        };

        await userService.updateUser(user);
        await userService.updateUserProfile(newUserProfile);

        await db.commit();
        res.status(200).json("profile update successfully");
        
    } catch (error) {
        (await connection).rollback();
        console.log("error during save userProfile", error);
        res.status(500).json("profile not updated");
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

export async function logout(req:Request,res:Response) {
    res.clearCookie('accessToken', { path: '/'});

    res.redirect('/signin')
}
