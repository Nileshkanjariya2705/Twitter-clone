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
exports.userProfile = exports.saveUserProfile = exports.findUserProfileByUserId = exports.getAllUser = exports.unFollow = exports.follow = void 0;
exports.logout = logout;
const userService = __importStar(require("../services/user.service"));
const db_1 = __importDefault(require("../config/db"));
// import { follow } from './user.controller';
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("follw opration start");
    const followingId = parseInt(req.params.userId);
    try {
        const followerId = req.user.userId;
        const follow = {
            followerId: followerId,
            followingId: followingId
        };
        if (yield userService.isFollow(follow)) {
            yield userService.unFollow(follow);
            res.status(200).json("unfollow success fully");
        }
        else {
            yield userService.follow(follow);
            ;
            res.status(200).json("follw success fully");
        }
    }
    catch (error) {
        console.log("errror during folloow ", error);
        res.status(500).json("fail to follow");
    }
});
exports.follow = follow;
const unFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("un follw opration start");
    const followingId = parseInt(req.params.userId);
    try {
        const followerId = req.user.userId;
        const follow = {
            followerId: followerId,
            followingId: followingId
        };
        yield userService.unFollow(follow);
        ;
        res.status(200).json("unfollw success fully");
    }
    catch (error) {
        console.log("errror during unfolloow ", error);
        res.status(500).json("fail to unfollow");
    }
});
exports.unFollow = unFollow;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get all user");
    try {
        const users = yield userService.getAllUser();
        res.status(200).json(users);
    }
    catch (error) {
        console.log("error during gettting all user", error);
        res.status(500).json("un able to find user");
    }
});
exports.getAllUser = getAllUser;
const findUserProfileByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting userProfile-------------------------------------");
    try {
        let userId = parseInt(req.query.userId);
        let isFollow = false;
        if (!userId) {
            userId = req.user.userId;
        }
        else {
            const follow = {
                followerId: req.user.userId,
                followingId: userId
            };
            isFollow = yield userService.isFollow(follow);
            console.log("userFollow", isFollow);
        }
        const user = yield userService.findByUserId(userId);
        const userProfile = yield userService.findUserProfileByUserId(userId);
        console.log(user);
        console.log(userProfile);
        res.status(200).json({ user: user, userProfile: userProfile, loggedInUserId: req.user.userId, isFollow: isFollow });
    }
    catch (error) {
        console.log("error during userprofile", error);
        res.status(500).json("can not find userprofile");
    }
});
exports.findUserProfileByUserId = findUserProfileByUserId;
const saveUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield db_1.default;
        yield db.beginTransaction();
        const body = req.body;
        const userId = req.user.userId;
        // 1. Fetch current profile for fallbacks
        const userProfileRows = yield userService.findUserProfileByUserId(userId);
        const currentProfile = userProfileRows[0];
        // 2. Handle files using field names
        // req.files will now be an object: { userCoverImage: [...], userProfilePic: [...] }
        const files = req.files;
        const userCoverImageUrl = (files && files['userCoverImage'])
            ? `/upload/${files['userCoverImage'][0].filename}`
            : currentProfile.userCoverImageUrl;
        const userProfilePicUrl = (files && files['userProfilePic'])
            ? `/upload/${files['userProfilePic'][0].filename}`
            : currentProfile.userProfilePicUrl;
        const newUserProfile = {
            userId: userId,
            userCoverImageUrl: userCoverImageUrl,
            userProfilePicUrl: userProfilePicUrl,
            userBio: body.userBio
        };
        const user = {
            userFullName: body.userFullName,
            userName: body.userName,
            userEmail: body.userEmail,
            userId: userId
        };
        yield userService.updateUser(user);
        yield userService.updateUserProfile(newUserProfile);
        yield db.commit();
        res.status(200).json("profile update successfully");
    }
    catch (error) {
        (yield db_1.default).rollback();
        console.log("error during save userProfile", error);
        res.status(500).json("profile not updated");
    }
});
exports.saveUserProfile = saveUserProfile;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getiing userProfile");
    try {
        let userId = parseInt(req.query.userId);
        if (!userId) {
            userId = req.user.userId;
        }
        if (!userId) {
            res.status(404).json("user not found");
        }
        const userProfile = yield userService.findUserProfileByUserId(userId);
        res.status(200).json({
            user: req.user,
            userProfile: userProfile
        });
    }
    catch (error) {
        console.log("can not get userProfile");
        res.status(500).json("can not found user profile");
    }
});
exports.userProfile = userProfile;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('accessToken', { path: '/' });
        res.redirect('/signin');
    });
}
//# sourceMappingURL=user.controller.js.map