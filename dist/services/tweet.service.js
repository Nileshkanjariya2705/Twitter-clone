"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLike = exports.getTweetLikeByTweetLike = exports.likeTweet = exports.addMedia = exports.deleteTweetByTweetId = exports.findTweetByTweetId = exports.findTweetByUserId = exports.getAllTweets = exports.addTweet = void 0;
exports.unLikeTweet = unLikeTweet;
const tweetRepository = __importStar(require("../repositories/tweet.repository"));
const addTweet = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.save(tweet);
});
exports.addTweet = addTweet;
const getAllTweets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tweets = yield tweetRepository.getAll(userId);
    // const media=await tweetRepository.getAllTweetMedia();
    //     const result = tweets.map(tweet => {
    //     return {
    //         ...tweet,
    //         media: media.filter(m => m.tweetId === tweet.tweetId)
    //     };
    //     });
    return tweets;
});
exports.getAllTweets = getAllTweets;
const findTweetByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.findByUserId(userId);
});
exports.findTweetByUserId = findTweetByUserId;
const findTweetByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.findByTweetId(tweetId);
});
exports.findTweetByTweetId = findTweetByTweetId;
const deleteTweetByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.deleteByTeetId(tweetId);
});
exports.deleteTweetByTweetId = deleteTweetByTweetId;
const addMedia = (media) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.saveMedia(media);
});
exports.addMedia = addMedia;
const likeTweet = (like) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweetRepository.likeTweet(like);
});
exports.likeTweet = likeTweet;
function unLikeTweet(like) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tweetRepository.unLikeTweet(like);
    });
}
const getTweetLikeByTweetLike = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    return tweetRepository.getTweetLikeByTweetId(tweetId);
});
exports.getTweetLikeByTweetLike = getTweetLikeByTweetLike;
const isLike = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tweetRepository.isLikeExist(userId, tweetId);
    console.log(result);
    if (result[0].c === 1) {
        return true;
    }
    else {
        return false;
    }
});
exports.isLike = isLike;
//# sourceMappingURL=tweet.service.js.map