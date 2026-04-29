import { Request, Response } from "express";
import connection from "../config/db";
import { ILike, IMedia, ITweet, IUser } from "../models/user.mode";
import * as  tweetService from '../services/tweet.service'
import * as  userService from '../services/user.service'

export const addTweet=async(req:Request,res:Response)=>{
    console.log("add tweet");
    try {
     (await connection).beginTransaction();
     const tweetBody:ITweet=req.body

        console.log(tweetBody.tweetText);
         const userId:number=(req.user as IUser).userId as number
      tweetBody.userId=userId;
      console.log(tweetBody);
      

        // const tweet={
        //     userId:userId,
        //     tweetText:tweetBody.tweetText
        // }


    

    const resultSet= await tweetService.addTweet(tweetBody);
    console.log("tweet added success full");
        
    const tweetId:number=resultSet.insertId;
    const files= req.files as Express.Multer.File[];
        
    if( files && files.length>0){
        console.log("medida contines");
        
        const length:number=files.length as number
        for(let i=0; i<length; i++){
            const media={
                tweetId:tweetId as number,
                mediaUrl: `upload/${(files[i] as any).originalname}` 
            }

            await tweetService.addMedia(media as IMedia)
        }
    }
    (await connection).commit();
    res.redirect('/user/dashboard')
    } catch (error) {
        console.log("error during adding tweet:",error);
        (await connection).rollback();
        res.status(500).json("tweet not add")
        
    }
}

export const getAllTweets=async(req:Request,res:Response)=>{
    console.log("getting all tweets");


    // 1.user 2.userprofile 3.tweet,4 tweetLike, 5.
    const userId=(req.user as IUser).userId as number
    try {
        const tweets=await tweetService.getAllTweets(userId)
         res.status(200).json({
            tweets:tweets
        });
    } catch (error) {
        console.log("errror during getting all tweets",error);
        res.status(500).json("can not get all tweets");
        
    }
}

export const getAllOfUser=async(req:Request,res:Response)=>{
    console.log("getting all tweets of userId");
    let userId:number=parseInt(req.query.userId as string);
            if(!userId){
                userId=(req.user as IUser).userId as number
            }
    
    try {
        const tweets:ITweet[]=await tweetService.findTweetByUserId(userId);
        res.status(200).json(tweets);
    } catch (error) {
        console.log("errror during getting all tweets of userId",error);
        res.status(500).json("tweets not found");
        
    }
    
}




export const getTweetByTweetId=async(req:Request,res:Response)=>{
    console.log("getting all tweets of tweetId");
    const tweetId:number=parseInt(req.params.tweetId as string)
    try {
        const tweets:ITweet[]=await tweetService.findTweetByTweetId(tweetId)
        res.status(200).json(tweets);
    } catch (error) {
        console.log("errror during getting all tweets by tweet id",error);
        res.status(500).json("tweets not found");
        
    }
    
}



export const deleteTweetByTweetId=async(req:Request,res:Response)=>{
    console.log("deleting tweet by tweet id");
    const tweetId:number=parseInt(req.params.tweetId as string)
    try {
        await tweetService.deleteTweetByTweetId(tweetId)
        res.status(200).json("tweet deleted success fully");
    } catch (error) {
        console.log("delering tweets",error);
        res.status(500).json("tweets not found");
        
    }
    
}


export const updateTweet=async(req:Request,res:Response)=>{
    console.log("update tweet");
    const tweetId:number=parseInt(req.params.tweetId as string)
    try {
          const tweetBody:ITweet[]=req.body;
          
          
    } catch (error) {
        console.log("error during updating tweet:",error);
        res.status(500).json("can not update tweet");
        
    }
    
}


export const likeTweet=async(req:Request,res:Response)=>{
    console.log("like tweet");
    try {
        const tweetId:number=parseInt(req.params.tweetId as string)
        const userId:number=(req.user as IUser).userId as number

        const isLike=await tweetService.isLike(userId,tweetId)
           const like:ILike={
            tweetId:tweetId,
            userId:userId
        }
        if(isLike){
            await tweetService.unLikeTweet(like)
            res.status(200).json("unlike success fully")
        }else{
        await tweetService.likeTweet(like);
        res.status(200).json("like success fully")
        }

     

    
    } catch (error) {
        console.log("error during like tweet",error);
        res.status(500).json("tweet not like")
        
    }
    
}



export const unLikeTweet=async(req:Request,res:Response)=>{
    console.log(" unlike  tweet");
    try {
        const tweetId:number=parseInt(req.params.tweetId as string)
        const userId:number=(req.user as IUser).userId as number

        const like:ILike={
            tweetId:tweetId,
            userId:userId
        }

        await tweetService.unLikeTweet(like);
        res.status(200).json("dis like success fully")
    } catch (error) {
        console.log("error during dislike tweet",error);
        res.status(500).json("tweet not dis like")
        
    }
    
}