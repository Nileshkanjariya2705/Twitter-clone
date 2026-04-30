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
exports.updatePassword = exports.findUserProfile = exports.follow = exports.findUserPhoneNumber = exports.findUserEmail = exports.findUserByUserName = exports.updateUser = exports.createUser = exports.getAllUser = exports.findByUserId = void 0;
exports.unFollow = unFollow;
exports.updateUserProfile = updateUserProfile;
exports.isFollow = isFollow;
const db_1 = __importDefault(require("../config/db"));
const findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query('select * from users where userId=?', [userId]);
    return resultSet;
});
exports.findByUserId = findByUserId;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query('select * from users ');
    return resultSet;
});
exports.getAllUser = getAllUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`insert into users
        (userFullName,userEmail,userPhoneNumber,userDateOfBirth,userPassword,userName,provider,providerId)
        values(?,?,?,?,?,?,?,?)
        `, [user.userFullName, user.userEmail || null, user.userPhoneNumber || null, user.userDateOfBirth || null, user.userPassword || null, user.userName, user.provider, user.providerId || null]);
    return resultSet;
});
exports.createUser = createUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`update users
        set userName=?,
        userEmail=?,
        userFullName=?
        where userId=?
        `, [user.userName, user.userEmail, user.userFullName, user.userId]);
    return resultSet;
});
exports.updateUser = updateUser;
const findUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`select * from users where userName=?`, [userName]);
    return resultSet;
});
exports.findUserByUserName = findUserByUserName;
const findUserEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`select * from users where userEmail=?`, [userEmail]);
    return resultSet;
});
exports.findUserEmail = findUserEmail;
const findUserPhoneNumber = (userPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`select * from users where userPhoneNumber=?`, [userPhoneNumber]);
    return resultSet;
});
exports.findUserPhoneNumber = findUserPhoneNumber;
const follow = (follow) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`insert into userFollows (followerId,followingId) values(?,?)`, [follow.followerId, follow.followingId]);
    return result;
});
exports.follow = follow;
function unFollow(follow) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`delete from userFollows where followerId=? and  followingId=?`, [follow.followerId, follow.followingId]);
        return result;
    });
}
const findUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`select * ,
        (select count(*) from userFollows where followerId=up.userId) as followingCount,
        (select count(*) from userFollows where followingId=up.userId) as followerCount
        from userProfile as up
         where up.userId=?`, [userId]);
    return result;
});
exports.findUserProfile = findUserProfile;
function updateUserProfile(userProfile) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`update userProfile 
        set userCoverImageUrl=?,
        userProfilePicUrl=?,
        userBio=?
        where userId=?
        `, [userProfile.userCoverImageUrl, userProfile.userProfilePicUrl, userProfile.userBio, userProfile.userId]);
        return result;
    });
}
function isFollow(follow) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (yield db_1.default).query(`select count(*) as count from userFollows where followerId=? and followingId=?`, [follow.followerId, follow.followingId]);
        return result;
    });
}
const updatePassword = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query(`
        update users set userPassword=? where userId=?
        `, [password, userId]);
    return result;
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=user.repository.js.map