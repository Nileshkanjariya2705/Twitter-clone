import { ResultSetHeader } from 'mysql2';
import { ILike, IMedia, ITweet } from '../models/user.mode';
export declare const addTweet: (tweet: ITweet) => Promise<ResultSetHeader>;
export declare const getAllTweets: () => Promise<ITweet[]>;
export declare const findTweetByUserId: (userId: number) => Promise<ITweet[]>;
export declare const findTweetByTweetId: (tweetId: number) => Promise<ITweet[]>;
export declare const deleteTweetByTweetId: (tweetId: number) => Promise<ResultSetHeader>;
export declare const addMedia: (media: IMedia) => Promise<ResultSetHeader>;
export declare const likeTweet: (like: ILike) => Promise<ResultSetHeader>;
export declare function unLikeTweet(like: ILike): Promise<ResultSetHeader>;
//# sourceMappingURL=tweet.service.d.ts.map