"use strict";
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
exports.likeTweet = exports.getAllTweetMedia = exports.findMediaByTweetId = exports.updateMedia = exports.saveMedia = exports.updateTweet = exports.findByTweetId = exports.deleteByTeetId = exports.findByUserId = exports.getAll = exports.save = void 0;
exports.unLikeTweet = unLikeTweet;
const db_1 = __importDefault(require("../config/db"));
const save = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
         INSERT INTO tweets 
    (userId, tweetText, tweetType, parentTweetId) 
    VALUES (?, ?, ?, ?)
        `, [tweet.userId, tweet.tweetText || null, tweet.tweetType || "TWEET", tweet.parentTweetId || null]);
    return result;
});
exports.save = save;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * from tweets order by created_at desc`);
    return result;
});
exports.getAll = getAll;
const findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * from tweets where userId=?`, [userId]);
    return result;
});
exports.findByUserId = findByUserId;
const deleteByTeetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`delete from tweets where tweetId=?`, [tweetId]);
    return result;
});
exports.deleteByTeetId = deleteByTeetId;
const findByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * from tweets where tweetId=?`, [tweetId]);
    return result;
});
exports.findByTweetId = findByTweetId;
const updateTweet = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`update tweets
          set tweetText=?, tweetType=?
          where tweetId=?
          `, [tweet.tweetText, tweet.tweetType, tweet.tweetId]);
    return result;
});
exports.updateTweet = updateTweet;
const saveMedia = (media) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`insert into tweetMedia
          (tweetId,mediaUrl,mediaType) values(?,?,?)
          `, [media.tweetId, media.mediaUrl, media.mediaType]);
    return result;
});
exports.saveMedia = saveMedia;
const updateMedia = (media) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
          update tweetMedia set mediaUrl=?,mediaType=? where tweetId=?
          `, [media.mediaUrl, media.mediaType, media.mediaId]);
    return result;
});
exports.updateMedia = updateMedia;
const findMediaByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * from media where tweetId=?`, [tweetId]);
    return result;
});
exports.findMediaByTweetId = findMediaByTweetId;
const getAllTweetMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * from tweetMedia`);
    return result;
});
exports.getAllTweetMedia = getAllTweetMedia;
const likeTweet = (like) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`insert into tweetLike (tweetId,userId) values(?,?)`, [like.tweetId, like.userId]);
    return result;
});
exports.likeTweet = likeTweet;
function unLikeTweet(like) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`delete from tweetLike where tweetId=? and userId=?`, [like.tweetId, like.userId]);
        return result;
    });
}
//# sourceMappingURL=tweet.repository.js.map