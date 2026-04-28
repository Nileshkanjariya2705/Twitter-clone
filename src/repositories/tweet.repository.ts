import { ResultSetHeader } from "mysql2";
import connection from "../config/db";
import { ILike, IMedia, ITweet } from "../models/user.mode";
import { realpathSync } from "node:fs";
import { resolveTlsa } from "node:dns";

export const save=async(tweet:ITweet):Promise<ResultSetHeader>=>{
    const [result]=await (await connection).query<ResultSetHeader>(`
         INSERT INTO tweets 
    (userId, tweetText, tweetType, parentTweetId) 
    VALUES (?, ?, ?, ?)
        `,[tweet.userId,tweet.tweetText ||null,tweet.tweetType||"TWEET",tweet.parentTweetId||null])
     return result;   
}


export const getAll=async():Promise<ITweet[]>=>{
     const [result]=await (await connection).query<ITweet[]>(`select * from tweets order by created_at desc`)
     return result;
}

export const findByUserId=async(userId:number):Promise<ITweet[]>=>{
     const [result]=await (await connection).query<ITweet[]>(`select * from tweets where userId=?`,[userId])
     return result;
}

export const deleteByTeetId=async(tweetId:number):Promise<ResultSetHeader>=>{
     const [result]=await (await connection).query<ResultSetHeader>(`delete from tweets where tweetId=?`,[tweetId])
     return result;
}
export const findByTweetId=async(tweetId:number)=>{
     const [result]=await (await connection).query<ITweet[]>(`select * from tweets where tweetId=?`,[tweetId])
     return result;
}


export const updateTweet=async(tweet:ITweet):Promise<ResultSetHeader>=>{
     const [result]=await (await connection).query<ResultSetHeader>(`update tweets
          set tweetText=?, tweetType=?
          where tweetId=?
          `,[tweet.tweetText,tweet.tweetType,tweet.tweetId]);
          return result;
}

export const saveMedia=async(media:IMedia):Promise<ResultSetHeader>=>{
     const [result]=await (await connection).query<ResultSetHeader>(`insert into tweetMedia
          (tweetId,mediaUrl,mediaType) values(?,?,?)
          `,[media.tweetId,media.mediaUrl,media.mediaType]);

        return result;  
}


export const updateMedia=async(media:IMedia):Promise<ResultSetHeader>=>{
     const [result]=await (await connection).query<ResultSetHeader>(`
          update tweetMedia set mediaUrl=?,mediaType=? where tweetId=?
          `,[media.mediaUrl,media.mediaType,media.mediaId]);

        return result;  
}


export const findMediaByTweetId=async(tweetId:number):Promise<IMedia[]>=>{
     const [result]=await (await connection).query<IMedia[]>(`select * from media where tweetId=?`,[tweetId]);
     return result;
}


export const getAllTweetMedia=async():Promise<IMedia[]>=>{
     const [result]= await (await connection).query<IMedia[]>(`select * from tweetMedia`)
     return result;
}


export const likeTweet=async(like:ILike):Promise<ResultSetHeader>=>{
     const [result]=await (await connection).query<ResultSetHeader>(`insert into tweetLike (tweetId,userId) values(?,?)`,[like.tweetId,like.userId]);
     return result;
}

export async function unLikeTweet(like: ILike) {
      const [result]=await (await connection).query<ResultSetHeader>(`delete from tweetLike where tweetId=? and userId=?`,[like.tweetId,like.userId]);
     return result;
}
