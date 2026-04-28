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
exports.uploadImage = exports.login = exports.saveUser = exports.isUserNameExist = exports.optVerification = exports.sendOtp = void 0;
exports.googleCallBack = googleCallBack;
const userService = __importStar(require("../services/user.service"));
const helper = __importStar(require("../common/helper.common"));
const authService = __importStar(require("../services/auth.service"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--------------genrate OPT--------------------");
    try {
        // optBody
        // {
        //   "identifier": "dhruv@gmail.com",
        //   "purpose": "SIGNUP"
        // }
        const optBody = req.body;
        console.log(optBody);
        // genrate otp
        const otp = helper.createOtp();
        // create hash
        const otpHash = yield helper.genrateHash(otp.toString());
        console.log(otpHash);
        optBody.otp_hash = otpHash;
        console.log(optBody);
        // save otp in database
        const result = yield authService.addOtpTODatabase(optBody);
        // last inserted id
        const otpId = result.insertId;
        console.log("otp is:", otp, "otpId:", otpId);
        // otp send to user 
        helper.sendOptViaMail(otp, otp);
        res.status(201).json({
            msg: "otp sent success fully",
            otpId: otpId
        });
    }
    catch (error) {
        console.log("error during genrate otp:", error);
        res.status(500).json("can not genrate otp");
    }
});
exports.sendOtp = sendOtp;
const optVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("opt verification start");
    //     {
    //     "otpId":"2",
    //     "otp_hash":"809782"
    //        }
    try {
        const otpBody = req.body;
        console.log(otpBody);
        const databaseOtp = yield authService.findOtpById(otpBody.otpId);
        console.log(databaseOtp);
        const isOtpExpire = helper.checkValidity((_a = databaseOtp[0]) === null || _a === void 0 ? void 0 : _a.genrateTime);
        if (!isOtpExpire) {
            res.status(404).json("otp is expire");
            return;
        }
        const isOtpValid = yield helper.compareHash(otpBody.otp_hash, (_b = databaseOtp[0]) === null || _b === void 0 ? void 0 : _b.otp);
        if (isOtpValid) {
            res.status(200).json("otp is valid");
        }
        else {
            res.status(404).json("invalid otp");
        }
    }
    catch (error) {
        console.log("error during otp check otp", error);
        res.status(500).json("error to compare otp");
    }
});
exports.optVerification = optVerification;
const isUserNameExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ckeck user name exist or not in database");
    try {
        const body = req.body;
        const databaseResponse = yield userService.findUserName(body.userName);
        console.log(databaseResponse);
        if (databaseResponse.length > 0) {
            res.status(200).json("this user name already tekon");
            return;
        }
        else {
            res.status(404).json("user name not exists");
        }
    }
    catch (error) {
        console.log("error during chekck username in database:", error);
        res.status(500).json("database error for check user Name");
    }
});
exports.isUserNameExist = isUserNameExist;
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("---add user to database----");
    try {
        const user = req.body;
        console.log(user);
        const identifier = user.identifier;
        if (identifier === null || identifier === void 0 ? void 0 : identifier.includes('@')) {
            user.userEmail = identifier;
        }
        else {
            user.userPhoneNumber = identifier;
        }
        // encrypt password
        const password_hash = yield helper.genrateHash(user.userPassword);
        user.userPassword = password_hash;
        user.provider = 'EMAIL';
        const databaseResponse = yield userService.createUser(user);
        const lastInsertedId = databaseResponse.insertId;
        // const databaseUser:IUser[]=await userService.findByUserId(lastInsertedId);
        const payload = {
            userId: lastInsertedId,
            userName: user.userName
        };
        const { accessToken, refereshToken } = helper.genrateJwtToken(payload);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        yield authService.saveRefreshTokenInDB(lastInsertedId, refereshToken);
        res.status(201).json("user created successFully");
    }
    catch (error) {
        console.log("error during save user in database:", error);
        res.status(500).json("data not inserted");
    }
});
exports.saveUser = saveUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    console.log("login check");
    try {
        const body = req.body;
        console.log(body);
        const inputValue = body.identifier;
        let databaseResponse;
        if (inputValue.includes('@')) {
            console.log("email");
            databaseResponse = yield userService.findUserEmail(inputValue);
        }
        else if (/^\d{10}$/.test(inputValue)) {
            console.log("phone number");
            databaseResponse = yield userService.findUserPhoneNumber(inputValue);
        }
        else {
            console.log("username");
            databaseResponse = yield userService.findUserName(inputValue);
        }
        if (databaseResponse.length === 0) {
            res.status(404).json("user not found");
            return;
        }
        console.log(databaseResponse);
        const password_hash = (_a = databaseResponse[0]) === null || _a === void 0 ? void 0 : _a.userPassword;
        // console.log(password_hash,"password hash");
        // console.log(body.userPassword,"password hash");
        const isPasswordCorrect = yield helper.compareHash(body.userPassword, password_hash);
        if (isPasswordCorrect) {
            console.log('true');
            const payload = {
                userId: (_b = databaseResponse[0]) === null || _b === void 0 ? void 0 : _b.userId,
                userName: (_c = databaseResponse[0]) === null || _c === void 0 ? void 0 : _c.userName
            };
            const { accessToken, refereshToken } = helper.genrateJwtToken(payload);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            yield authService.saveRefreshTokenInDB((_d = databaseResponse[0]) === null || _d === void 0 ? void 0 : _d.userId, refereshToken);
            res.status(200).json("login success fully");
        }
        else {
            res.status(404).json("invalid credintials");
        }
    }
    catch (error) {
        console.log("error during login", error);
        res.status(500).json("login fail");
    }
});
exports.login = login;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("image uploading start");
    try {
        const url = yield helper.uploadImage("/home/nilesh-kanjariya/twitter clone/Twitter/public/photos/twitter_Logo.png");
        if (url) {
            res.status(404).json("image not upload");
        }
        else {
            console.log(url);
            res.status(200).json(url);
        }
    }
    catch (error) {
        console.log("image uploading error", error);
    }
});
exports.uploadImage = uploadImage;
function googleCallBack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const payload = {
                userId: user.userId,
                userName: user.userName
            };
            const { accessToken, refereshToken } = helper.genrateJwtToken(payload);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000 * 24,
                secure: true
            });
            yield authService.saveRefreshTokenInDB(user.userId, refereshToken);
            res.redirect('/user/dashboard');
        }
        catch (error) {
            console.log("google callback", error);
            res.status(500).json("can not redirect in dashboard");
        }
    });
}
//# sourceMappingURL=auth.controller.js.map