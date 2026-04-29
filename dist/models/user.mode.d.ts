import { RowDataPacket } from "mysql2";
export interface IUser {
    userId?: number;
    identifier?: string;
    userFullName: string;
    userName: string;
    userEmail?: string;
    userPhoneNumber?: string;
    userPassword?: string;
    provider?: 'EMAIL' | 'GOOGLE' | 'PHONE';
    providerId?: string;
    userDateOfBirth?: string;
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
    media?: IMedia[];
    tweetType?: 'TWEET' | 'REPLY' | 'RETWEET' | 'QUOTE';
    parentTweetId?: number;
    isDeleted?: boolean;
    created_at?: string;
    updated_at?: string;
}
export interface IOtp {
    otpId: number;
    identifier: string;
    otp_hash: string;
    otp?: string;
    genrateTime: string;
    attempts: number;
}
export interface IPayload {
    userId: number;
    userName: string;
}
export interface ILogin {
    identifier: string;
    userPassword: string;
}
export interface IMedia extends RowDataPacket {
    mediaId?: number;
    tweetId: number;
    mediaUrl: any;
    mediaType?: string;
    created_at?: string;
}
export interface IFollow {
    userFollowsId?: number;
    followerId: number;
    followingId: number;
    created_at?: string;
}
export interface ILike {
    likeId?: number;
    tweetId: number;
    userId: number;
    created_at?: string;
}
export interface IUserProfile {
    userProfileId?: number;
    userId?: number;
    userBio?: string;
    userCoverImageUrl?: string;
    userProfilePicUrl?: string;
    followerCount?: number;
    followingCount?: number;
    created_at?: string;
    updated_at?: string;
}
//# sourceMappingURL=user.mode.d.ts.map