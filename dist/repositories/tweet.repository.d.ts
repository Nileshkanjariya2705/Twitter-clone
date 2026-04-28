import { ResultSetHeader } from "mysql2";
import { ILike, IMedia, ITweet } from "../models/user.mode";
export declare const save: (tweet: ITweet) => Promise<ResultSetHeader>;
export declare const getAll: () => Promise<ITweet[]>;
export declare const findByUserId: (userId: number) => Promise<ITweet[]>;
export declare const deleteByTeetId: (tweetId: number) => Promise<ResultSetHeader>;
export declare const findByTweetId: (tweetId: number) => Promise<ITweet[]>;
export declare const updateTweet: (tweet: ITweet) => Promise<ResultSetHeader>;
export declare const saveMedia: (media: IMedia) => Promise<ResultSetHeader>;
export declare const updateMedia: (media: IMedia) => Promise<ResultSetHeader>;
export declare const findMediaByTweetId: (tweetId: number) => Promise<IMedia[]>;
export declare const getAllTweetMedia: () => Promise<IMedia[]>;
export declare const likeTweet: (like: ILike) => Promise<ResultSetHeader>;
export declare function unLikeTweet(like: ILike): Promise<ResultSetHeader>;
//# sourceMappingURL=tweet.repository.d.ts.map