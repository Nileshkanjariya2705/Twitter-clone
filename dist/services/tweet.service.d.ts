import { ResultSetHeader } from 'mysql2';
import { IComment, ICommentReplay, ILike, IMedia, ITweet } from '../models/user.mode';
export declare const addTweet: (tweet: ITweet) => Promise<ResultSetHeader>;
export declare const getAllTweets: (userId: number, search: string) => Promise<ITweet[]>;
export declare const findTweetByUserId: (userId: number) => Promise<ITweet[]>;
export declare const findTweetByTweetId: (tweetId: number) => Promise<ITweet[]>;
export declare const deleteTweetByTweetId: (tweetId: number) => Promise<ResultSetHeader>;
export declare const addMedia: (media: IMedia) => Promise<ResultSetHeader>;
export declare const likeTweet: (like: ILike) => Promise<ResultSetHeader>;
export declare function unLikeTweet(like: ILike): Promise<ResultSetHeader>;
export declare const getTweetLikeByTweetLike: (tweetId: number) => Promise<ResultSetHeader>;
export declare const isLike: (userId: number, tweetId: number) => Promise<boolean>;
export declare function isRetweetByUser(userId: number, tweetId: number): Promise<import("mysql2").QueryResult>;
export declare function addComment(comment: IComment): Promise<void>;
export declare function commentReplay(commentReplay: ICommentReplay): Promise<void>;
export declare const getCommentByTweetId: (tweetId: number) => Promise<import("mysql2").QueryResult>;
export declare const getMediaByTweetId: (tweetId: number) => Promise<IMedia[]>;
//# sourceMappingURL=tweet.service.d.ts.map