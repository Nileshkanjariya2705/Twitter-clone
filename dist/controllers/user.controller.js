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
exports.saveUserProfile = exports.findUserProfileByUserId = exports.userProfile = exports.getAllUser = exports.unFollow = exports.follow = void 0;
const userService = __importStar(require("../services/user.service"));
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("follw opration start");
    const followingId = parseInt(req.params.userId);
    try {
        const followerId = req.user.userId;
        const follow = {
            followerId: followerId,
            followingId: followingId
        };
        yield userService.follow(follow);
        ;
        res.status(200).json("follw success fully");
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
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update user profile");
});
exports.userProfile = userProfile;
const findUserProfileByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting userProfile");
    try {
        const userId = req.user.userId;
        const user = yield userService.findByUserId(userId);
        const userProfile = yield userService.findUserProfileByUserId(userId);
        console.log(user);
        console.log(userProfile);
        res.status(200).json({ user: user, userProfile: userProfile });
    }
    catch (error) {
        console.log("error during userprofile", error);
        res.status(500).json("can not find userprofile");
    }
});
exports.findUserProfileByUserId = findUserProfileByUserId;
const saveUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("save userProfile");
    try {
        const body = req.body;
        console.log(body.userFullName);
    }
    catch (error) {
        console.log("error during save userProfile");
    }
});
exports.saveUserProfile = saveUserProfile;
//# sourceMappingURL=user.controller.js.map