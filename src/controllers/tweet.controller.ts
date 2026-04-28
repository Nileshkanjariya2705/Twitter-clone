import { Request, Response } from "express";
import connection from "../config/db";
import { ILike, IMedia, ITweet, IUser } from "../models/user.mode";
import * as  tweetService from '../services/tweet.service'

export const addTweet=async(req:Request,res:Response)=>{
    console.log("add tweet");
    try {
     (await connection).beginTransaction();
    const tweetBody:ITweet=req.body
     const userId:number=(req.user as IUser).userId as number
    tweetBody.userId=userId;

    const resultSet= await tweetService.addTweet(tweetBody);

    const tweetId:number=resultSet.insertId;

    if(tweetBody.media && tweetBody.media.length>0){
        const length:number=tweetBody.media?.length as number;
        for(let i=0; i<length; i++){
            const media:IMedia=tweetBody.media[i] as IMedia;
            media.tweetId=tweetId
            await tweetService.addMedia(media)
        }
    }
    (await connection).commit();
    res.status(201).json("tweet added successfull")
    } catch (error) {
        console.log("error during adding tweet:",error);
        (await connection).rollback();
        res.status(500).json("tweet not add")
        
    }
}

export const getAllTweets=async(req:Request,res:Response)=>{
    console.log("getting all tweets");
    try {
        const tweets:ITweet[]=await tweetService.getAllTweets();
        res.status(200).json(tweets);
    } catch (error) {
        console.log("errror during getting all tweets",error);
        res.status(500).json("can not get all tweets");
        
    }
    
}

export const getAllOfUser=async(req:Request,res:Response)=>{
    console.log("getting all tweets of userId");
    const userId:number=parseInt(req.params.userId as string)
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

        const like:ILike={
            tweetId:tweetId,
            userId:userId
        }

        await tweetService.likeTweet(like);
        res.status(200).json("like success fully")
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