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
exports.findCommentByTweetId = exports.commentReplay = exports.addComment = exports.isLikeExist = exports.getTweetLikeByTweetId = exports.likeTweet = exports.getAllTweetMedia = exports.findMediaByTweetId = exports.updateMedia = exports.saveMedia = exports.updateTweet = exports.findByTweetId = exports.deleteByTeetId = exports.findByUserId = exports.getAll = exports.save = void 0;
exports.unLikeTweet = unLikeTweet;
exports.isRetweetByUser = isRetweetByUser;
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
const getAll = (userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    const searchPattern = search ? `%${search}%` : null;
    const [result] = yield (yield db_1.default).query(`
               select u.userName,u.userFullName,up.userProfilePicUrl,u.userId,t.tweetId,m.mediaUrl,m.mediaType,
          t.tweetText, 
          t.tweetType, 
          t.parentTweetId ,
          t.created_at,
          m.mediaUrl,
          (select count(*) from tweetLike where tweetId=t.tweetId) as likeCount,
          (select count(*) from tweetLike where tweetId=t.tweetId and userId=? ) as likeMe,
          (select count(*) from tweets where  parentTweetId=t.tweetId) as reTweet,
          (select count(*) from comment where tweetId=t.tweetId) as commentCount
               from tweets as t
               join users as u
               on t.userId=u.userId	
                join userProfile as up
               on up.userId=u.userId
               left join tweetMedia as m 
               on m.tweetId=t.tweetId
               where u.userName like ?
               order by t.created_at desc
          `, [userId, search]);
    return result;
});
exports.getAll = getAll;
const findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
            select u.userName,u.userFullName,up.userProfilePicUrl,u.userId,t.tweetId,m.mediaUrl,m.mediaType,
          t.tweetText, 
          t.tweetType, 
          t.parentTweetId ,
          t.created_at,
          m.mediaUrl,
          (select count(*) from tweetLike where tweetId=t.tweetId) as likeCount,
          (select count(*) from tweetLike where tweetId=t.tweetId and userId=? ) as likeMe,
          (select count(*) from tweets where  parentTweetId=t.tweetId) as reTweet,
          (select count(*) from comment where tweetId=t.tweetId) as commentCount
               from tweets as t
               join users as u
               on t.userId=u.userId	
                join userProfile as up
               on up.userId=u.userId
               left join tweetMedia as m 
               on m.tweetId=t.tweetId
               where t.userId=?
               order by t.created_at desc
               `, [userId, userId]);
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
    const [result] = yield (yield db_1.default).query(`select * from tweetMedia where tweetId=?`, [tweetId]);
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
const getTweetLikeByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
          select tweetId, count(*) as count from tweetLike where tweetId=?
          `, [tweetId]);
    return result;
});
exports.getTweetLikeByTweetId = getTweetLikeByTweetId;
function unLikeTweet(like) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`delete from tweetLike where tweetId=? and userId=?`, [like.tweetId, like.userId]);
        return result;
    });
}
const isLikeExist = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query('select count(*) as c from tweetLike where userId=? and tweetId=?', [userId, tweetId]);
    return result;
});
exports.isLikeExist = isLikeExist;
function isRetweetByUser(userId, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`select tweetId , count(*) as count from tweets where userId=? and parentTweetId=? and tweetType='RETWEET'`, [userId, tweetId]);
        return result;
    });
}
const addComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`insert into comment (userId,tweetId,commentText) values(?,?,?)`, [
        comment.userId,
        comment.tweetId,
        comment.commentText
    ]);
});
exports.addComment = addComment;
const commentReplay = (commentReplay) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`insert into commentReplay (userId,commentId,commentText) values(?,?,?)`, [
        commentReplay.userId,
        commentReplay.commentId,
        commentReplay.commentText
    ]);
});
exports.commentReplay = commentReplay;
// export const findCommentByTweetId = async (tweetId: number) => {
//      const [result] = await (await connection).query(`
//           select c.* ,u.*,up.*,
//           (select commentId from commentReplay where commentId=c.commentId) as replayId
//           from comment as c 
//           join users as u on u.userId=c.userId
//           join userProfile as up on up.userId=c.userId
//            where tweetId=?
//      `, [tweetId]);
//      return result;
// }
const findCommentByTweetId = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
       
          select 
               u.userName, u.userFullName, up.userProfilePicUrl, u.userId,
               c.commentId, c.commentText, c.create_at AS created_at,
               'comment' AS type,
               NULL AS replyingTo 
          from comment as c
          join users as u ON c.userId = u.userId
          join userProfile as up on c.userId = up.userId
          where c.tweetId = ?

          union all

          
          select 
               u.userName, u.userFullName, up.userProfilePicUrl, u.userId,
               cr.commentReplayId as commentId, cr.commentText, cr.created_at,
               'reply' AS type,
               u_parent.userName as replyingTo 
          from commentReplay as cr
          join comment AS c on cr.commentId = c.commentId
          join users AS u on cr.userId = u.userId
          join userProfile as up on cr.userId = up.userId
          join users AS u_parent on c.userId = u_parent.userId 
          where c.tweetId = ?

          order by created_at ASC
     `, [tweetId, tweetId]);
    return result;
});
exports.findCommentByTweetId = findCommentByTweetId;
//# sourceMappingURL=tweet.repository.js.map