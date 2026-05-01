import { RowDataPacket } from "mysql2";
import { identifier } from '../controllers/view.controller';

export interface IUser {
  userId?: number;
  identifier?:string

  userFullName: string;
  userName: string;

  userEmail?: string;
  userPhoneNumber?: string;

  userPassword?: string; // hashed password (bcrypt)

  provider?: 'EMAIL' | 'GOOGLE' | 'PHONE';
  providerId?: string;

  userDateOfBirth?: string; // ISO format: YYYY-MM-DD

  userProfilePicUrl?: string;
  userCoverImageUrl?: string;
  userBio?: string;

  created_at?: string;
  updated_at?: string;
}

export interface ITweet extends RowDataPacket {
  tweetId?: number;

  userId: number;

  tweetText?: string;
  media?:IMedia[]
  tweetType?: 'TWEET' | 'REPLY' | 'RETWEET' | 'QUOTE';
  parentTweetId?:number
  isDeleted?: boolean;

  created_at?: string;   // ISO format
  updated_at?: string;   // ISO format
}





export interface IOtp{
    otpId :number
    identifier:string,
    otp_hash :string
    otp?:string
    genrateTime :string
    attempts :number
}


export interface IPayload {
  userId: number;
  userName: string;
}


export interface ILogin{
    identifier:string
    userPassword:string
    rememberMe?:string
}

export interface IMedia extends RowDataPacket{
      mediaId?:number
    tweetId:number,
    mediaUrl :any
    mediaType ?:string
    created_at ?:string
}


export interface IFollow{
    userFollowsId?:number
    followerId :number 
    followingId :number
    created_at ?:string
}

export interface ILike{
  likeId?:number,
  tweetId:number,
  userId:number,
  created_at?:string
}

export interface IUserProfile{
    userProfileId ?:number | undefined
    userId ?:number | undefined
    userBio ?:string | undefined
    userCoverImageUrl ?:string | undefined
    userProfilePicUrl ?:string | undefined
    followerCount ?:number | undefined
    followingCount ?:number | undefined
    created_at ?:string | undefined
    updated_at ?:string | undefined
}


export interface IComment{
   commentId ?:number
    userId :number
    tweetId :number
    commentText :number
    create_at  ?:string
  
}

export interface ICommentReplay{
  commentReplayId ?:number
    commentId :number
    userId:number
	commentText :string
    created_at ?:string
}