import { ResultSetHeader } from 'mysql2';
import { ILike, IMedia, ITweet } from '../models/user.mode';
import * as tweetRepository from '../repositories/tweet.repository'

export const addTweet=async(tweet:ITweet)=>{
    return await tweetRepository.save(tweet);
}

export const getAllTweets=async():Promise<ITweet[]>=>{

    const tweets=await tweetRepository.getAll();
    const media=await tweetRepository.getAllTweetMedia();

        const result = tweets.map(tweet => {
        return {
            ...tweet,
            media: media.filter(m => m.tweetId === tweet.tweetId)
        };
        });
      return result;  


}

export const findTweetByUserId=async(userId:number):Promise<ITweet[]>=>{
    return await tweetRepository.findByUserId(userId);
}


export const findTweetByTweetId=async(tweetId:number):Promise<ITweet[]>=>{
    return await tweetRepository.findByTweetId(tweetId);
}

export const deleteTweetByTweetId=async(tweetId:number):Promise<ResultSetHeader>=>{
    return await tweetRepository.deleteByTeetId(tweetId);
}

export const addMedia=async(media:IMedia):Promise<ResultSetHeader>=>{
    return await tweetRepository.saveMedia(media);
}

export const likeTweet=async(like:ILike):Promise<ResultSetHeader>=>{
    return await tweetRepository.likeTweet(like);
}

export async function unLikeTweet(like: ILike) {
    return await tweetRepository.unLikeTweet(like)
}
