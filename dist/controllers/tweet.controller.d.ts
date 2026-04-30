import { Request, Response } from "express";
export declare const addTweet: (req: Request, res: Response) => Promise<void>;
export declare const getAllTweets: (req: Request, res: Response) => Promise<void>;
export declare const getAllOfUser: (req: Request, res: Response) => Promise<void>;
export declare const getTweetByTweetId: (req: Request, res: Response) => Promise<void>;
export declare const deleteTweetByTweetId: (req: Request, res: Response) => Promise<void>;
export declare const updateTweet: (req: Request, res: Response) => Promise<void>;
export declare const likeTweet: (req: Request, res: Response) => Promise<void>;
export declare const unLikeTweet: (req: Request, res: Response) => Promise<void>;
export declare const reTweet: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=tweet.controller.d.ts.map