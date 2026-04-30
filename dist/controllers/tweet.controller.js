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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reTweet = exports.unLikeTweet = exports.likeTweet = exports.updateTweet = exports.deleteTweetByTweetId = exports.getTweetByTweetId = exports.getAllOfUser = exports.getAllTweets = exports.addTweet = void 0;
const db_1 = __importDefault(require("../config/db"));
const tweetService = __importStar(require("../services/tweet.service"));
const addTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("add tweet");
    try {
        (yield db_1.default).beginTransaction();
        const tweetBody = req.body;
        console.log(tweetBody.tweetText);
        const userId = req.user.userId;
        tweetBody.userId = userId;
        console.log(tweetBody);
        // const tweet={
        //     userId:userId,
        //     tweetText:tweetBody.tweetText
        // }
        const resultSet = yield tweetService.addTweet(tweetBody);
        console.log("tweet added success full");
        const tweetId = resultSet.insertId;
        const files = req.files || [];
        console.log(files);
        if (Array.isArray(files) && files.length > 0) {
            console.log("medida contines");
            const length = files.length;
            for (let i = 0; i < length; i++) {
                if (files[i]) {
                    const media = {
                        tweetId: tweetId,
                        mediaUrl: `upload/${files[i].originalname}`
                    };
                    yield tweetService.addMedia(media);
                }
            }
        }
        (yield db_1.default).commit();
        res.redirect('/user/dashboard');
    }
    catch (error) {
        console.log("error during adding tweet:", error);
        (yield db_1.default).rollback();
        res.status(500).json("tweet not add");
    }
});
exports.addTweet = addTweet;
const getAllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting all tweets");
    const value = req.query.search;
    const userId = req.user.userId;
    let search = '%';
    if (value != '%') {
        search = `%${value}%`;
    }
    console.log(search);
    // 1.user 2.userprofile 3.tweet,4 tweetLike, 5.
    try {
        const tweets = yield tweetService.getAllTweets(userId, search);
        res.status(200).json({
            tweets: tweets
        });
    }
    catch (error) {
        console.log("errror during getting all tweets", error);
        res.status(500).json("can not get all tweets");
    }
});
exports.getAllTweets = getAllTweets;
const getAllOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting all tweets of userId");
    let userId = parseInt(req.query.userId);
    if (!userId) {
        userId = req.user.userId;
    }
    try {
        const tweets = yield tweetService.findTweetByUserId(userId);
        res.status(200).json(tweets);
    }
    catch (error) {
        console.log("errror during getting all tweets of userId", error);
        res.status(500).json("tweets not found");
    }
});
exports.getAllOfUser = getAllOfUser;
const getTweetByTweetId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting all tweets of tweetId");
    const tweetId = parseInt(req.params.tweetId);
    try {
        const tweets = yield tweetService.findTweetByTweetId(tweetId);
        res.status(200).json(tweets);
    }
    catch (error) {
        console.log("errror during getting all tweets by tweet id", error);
        res.status(500).json("tweets not found");
    }
});
exports.getTweetByTweetId = getTweetByTweetId;
const deleteTweetByTweetId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleting tweet by tweet id");
    const tweetId = parseInt(req.params.tweetId);
    try {
        yield tweetService.deleteTweetByTweetId(tweetId);
        res.status(200).json("tweet deleted success fully");
    }
    catch (error) {
        console.log("delering tweets", error);
        res.status(500).json("tweets not found");
    }
});
exports.deleteTweetByTweetId = deleteTweetByTweetId;
const updateTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update tweet");
    const tweetId = parseInt(req.params.tweetId);
    try {
        const tweetBody = req.body;
    }
    catch (error) {
        console.log("error during updating tweet:", error);
        res.status(500).json("can not update tweet");
    }
});
exports.updateTweet = updateTweet;
const likeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("like tweet");
    try {
        const tweetId = parseInt(req.params.tweetId);
        const userId = req.user.userId;
        const isLike = yield tweetService.isLike(userId, tweetId);
        const like = {
            tweetId: tweetId,
            userId: userId
        };
        if (isLike) {
            yield tweetService.unLikeTweet(like);
            res.status(200).json("unlike success fully");
        }
        else {
            yield tweetService.likeTweet(like);
            res.status(200).json("like success fully");
        }
    }
    catch (error) {
        console.log("error during like tweet", error);
        res.status(500).json("tweet not like");
    }
});
exports.likeTweet = likeTweet;
const unLikeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" unlike  tweet");
    try {
        const tweetId = parseInt(req.params.tweetId);
        const userId = req.user.userId;
        const like = {
            tweetId: tweetId,
            userId: userId
        };
        yield tweetService.unLikeTweet(like);
        res.status(200).json("dis like success fully");
    }
    catch (error) {
        console.log("error during dislike tweet", error);
        res.status(500).json("tweet not dis like");
    }
});
exports.unLikeTweet = unLikeTweet;
const reTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    console.log("retweet post");
    try {
        const tweetId = parseInt(req.params.tweetId);
        const tweet = yield tweetService.findTweetByTweetId(tweetId);
        console.log(tweet);
        const postedTweet = yield tweetService.isRetweetByUser(req.user.userId, (_a = tweet[0]) === null || _a === void 0 ? void 0 : _a.tweetId);
        console.log(postedTweet);
        if (((_b = tweet[0]) === null || _b === void 0 ? void 0 : _b.userId) === req.user.userId) {
            res.status(404).json("user can not retweet your own tweet");
        }
        else if (postedTweet[0].count > 0) {
            yield tweetService.deleteTweetByTweetId(postedTweet[0].tweetId);
            res.status(200).json("un post success");
        }
        else {
            const newTweet = {
                userId: req.user.userId,
                tweetText: (_c = tweet[0]) === null || _c === void 0 ? void 0 : _c.tweetText,
                tweetType: 'RETWEET',
                parentTweetId: (_d = tweet[0]) === null || _d === void 0 ? void 0 : _d.tweetId
            };
            yield tweetService.addTweet(newTweet);
            console.log("retweet suceess---------------------");
            res.status(200).json("retweet success fully");
        }
    }
    catch (error) {
        console.log("error to repost", error);
        res.status(500).json("tweet not found");
    }
});
exports.reTweet = reTweet;
//# sourceMappingURL=tweet.controller.js.map