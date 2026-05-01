import { ResultSetHeader } from "mysql2";
import connection from "../config/db";
import { IComment, ILike, IMedia, ITweet ,ICommentReplay} from "../models/user.mode";
import { realpathSync } from "node:fs";
import { resolveTlsa } from "node:dns";
import { ExtractJwt } from "passport-jwt";

export const save = async (tweet: ITweet): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`
         INSERT INTO tweets 
    (userId, tweetText, tweetType, parentTweetId) 
    VALUES (?, ?, ?, ?)
        `, [tweet.userId, tweet.tweetText || null, tweet.tweetType || "TWEET", tweet.parentTweetId || null])
     return result;
}


export const getAll = async (userId:number,search:string): Promise<ITweet[]> => {
         const searchPattern = search ? `%${search}%` : null;
     const [result] = await (await connection).query<ITweet[]>(`
               select u.userName,u.userFullName,up.userProfilePicUrl,u.userId,t.tweetId,m.mediaUrl,m.mediaType,
          t.tweetText, 
          t.tweetType, 
          t.parentTweetId ,
          t.created_at,
          m.mediaUrl,
          (select count(*) from tweetLike where tweetId=t.tweetId) as likeCount,
          (select count(*) from tweetLike where tweetId=t.tweetId and userId=? ) as likeMe,
          (select count(*) from tweets where  parentTweetId=t.tweetId) as reTweet,
          (select count(*) from comment where tweetId=t.tweetId) as commentCount
               from tweets as t
               join users as u
               on t.userId=u.userId	
                join userProfile as up
               on up.userId=u.userId
               left join tweetMedia as m 
               on m.tweetId=t.tweetId
               where u.userName like ?
               order by t.created_at desc
          `,[userId,search ])
     return result;
}

export const findByUserId = async (userId: number): Promise<ITweet[]> => {
     const [result] = await (await connection).query<ITweet[]>(`
            select u.userName,u.userFullName,up.userProfilePicUrl,u.userId,t.tweetId,m.mediaUrl,m.mediaType,
          t.tweetText, 
          t.tweetType, 
          t.parentTweetId ,
          t.created_at,
          m.mediaUrl,
          (select count(*) from tweetLike where tweetId=t.tweetId) as likeCount,
          (select count(*) from tweetLike where tweetId=t.tweetId and userId=? ) as likeMe,
          (select count(*) from tweets where  parentTweetId=t.tweetId) as reTweet,
          (select count(*) from comment where tweetId=t.tweetId) as commentCount
               from tweets as t
               join users as u
               on t.userId=u.userId	
                join userProfile as up
               on up.userId=u.userId
               left join tweetMedia as m 
               on m.tweetId=t.tweetId
               where t.userId=?
               order by t.created_at desc
               `, [userId,userId])
     return result;
}

export const deleteByTeetId = async (tweetId: number): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`delete from tweets where tweetId=?`, [tweetId])
     return result;
}
export const findByTweetId = async (tweetId: number) => {
     const [result] = await (await connection).query<ITweet[]>(`select * from tweets where tweetId=?`, [tweetId])
     return result;
}


export const updateTweet = async (tweet: ITweet): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`update tweets
          set tweetText=?, tweetType=?
          where tweetId=?
          `, [tweet.tweetText, tweet.tweetType, tweet.tweetId]);
     return result;
}

export const saveMedia = async (media: IMedia): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`insert into tweetMedia
          (tweetId,mediaUrl,mediaType) values(?,?,?)
          `, [media.tweetId, media.mediaUrl, media.mediaType]);

     return result;
}


export const updateMedia = async (media: IMedia): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`
          update tweetMedia set mediaUrl=?,mediaType=? where tweetId=?
          `, [media.mediaUrl, media.mediaType, media.mediaId]);

     return result;
}


export const findMediaByTweetId = async (tweetId: number): Promise<IMedia[]> => {
     const [result] = await (await connection).query<IMedia[]>(`select * from tweetMedia where tweetId=?`, [tweetId]);
     return result;
}


export const getAllTweetMedia = async (): Promise<IMedia[]> => {
     const [result] = await (await connection).query<IMedia[]>(`select * from tweetMedia`)
     return result;
}


export const likeTweet = async (like: ILike): Promise<ResultSetHeader> => {
     const [result] = await (await connection).query<ResultSetHeader>(`insert into tweetLike (tweetId,userId) values(?,?)`, [like.tweetId, like.userId]);
     return result;
}

export const getTweetLikeByTweetId = async (tweetId: number) => {
     const [result] = await (await connection).query<ResultSetHeader>(`
          select tweetId, count(*) as count from tweetLike where tweetId=?
          `, [tweetId]);
     return result;
}

export async function unLikeTweet(like: ILike) {
     const [result] = await (await connection).query<ResultSetHeader>(`delete from tweetLike where tweetId=? and userId=?`, [like.tweetId, like.userId]);
     return result;
}


export const isLikeExist = async (userId: number, tweetId: number) => {
     const [result] = await (await connection).query('select count(*) as c from tweetLike where userId=? and tweetId=?', [userId, tweetId])
     return result;
}

export async function isRetweetByUser(userId: number, tweetId: number) {
     const [result] = await (await connection).query(`select tweetId , count(*) as count from tweets where userId=? and parentTweetId=? and tweetType='RETWEET'`, [userId, tweetId])
     return result;
}




export const addComment=async(comment:IComment)=>{
     const [result]=await (await connection).query( `insert into comment (userId,tweetId,commentText) values(?,?,?)`,[
          comment.userId,
          comment.tweetId,
          comment.commentText
     ])
}

export const commentReplay=async(commentReplay:ICommentReplay)=>{
     const [result]=await (await connection).query( `insert into commentReplay (userId,commentId,commentText) values(?,?,?)`,[
          commentReplay.userId,
          commentReplay.commentId,
          commentReplay.commentText
     ])
}


// export const findCommentByTweetId = async (tweetId: number) => {
//      const [result] = await (await connection).query(`
          
//           select c.* ,u.*,up.*,
//           (select commentId from commentReplay where commentId=c.commentId) as replayId
//           from comment as c 
//           join users as u on u.userId=c.userId
//           join userProfile as up on up.userId=c.userId
//            where tweetId=?
//      `, [tweetId]);

//      return result;
// }




export const findCommentByTweetId = async (tweetId: number) => {
     const [result] = await (await connection).query(`
       
          select 
               u.userName, u.userFullName, up.userProfilePicUrl, u.userId,
               c.commentId, c.commentText, c.create_at AS created_at,
               'comment' AS type,
               NULL AS replyingTo 
          from comment as c
          join users as u ON c.userId = u.userId
          join userProfile as up on c.userId = up.userId
          where c.tweetId = ?

          union all

          
          select 
               u.userName, u.userFullName, up.userProfilePicUrl, u.userId,
               cr.commentReplayId as commentId, cr.commentText, cr.created_at,
               'reply' AS type,
               u_parent.userName as replyingTo 
          from commentReplay as cr
          join comment AS c on cr.commentId = c.commentId
          join users AS u on cr.userId = u.userId
          join userProfile as up on cr.userId = up.userId
          join users AS u_parent on c.userId = u_parent.userId 
          where c.tweetId = ?

          order by created_at ASC
     `, [tweetId, tweetId]);

     return result;
}

