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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_jwt_1 = require("passport-jwt");
const userService = __importStar(require("../services/user.service"));
const authService = __importStar(require("../services/auth.service"));
const helper = __importStar(require("../common/helper.common"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ["profile", 'Email']
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("googl authentication start");
    try {
        const userFullName = profile.displayName;
        const userEmail = (_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
        const userProfilePic = profile.profileUrl;
        const provider = profile.provider;
        const providerId = profile.id;
        const googleUser = {
            userFullName: userFullName,
            userName: helper.genrateUserName((_b = (profile.name)) === null || _b === void 0 ? void 0 : _b.givenName),
            userEmail: userEmail,
            provider: provider,
            providerId: providerId
        };
        const user = yield userService.findUserEmail(userEmail);
        if (user.length > 0) {
            done(null, user[0]);
        }
        else {
            const result = yield userService.createUser(googleUser);
            yield authService.createUserProfile(user[0].userId);
            googleUser.userId = result.insertId;
            const payload = {
                userId: result.insertId,
                userName: googleUser.userName
            };
            done(null, googleUser);
        }
    }
    catch (error) {
        console.log("error during google authentication", error);
        done(null, false);
    }
})));
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
};
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};
passport_1.default.use(new passport_jwt_1.Strategy(options, function (payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Passport middleware reached!");
        try {
            const user = yield userService.findByUserId(payload.userId);
            if (user.length > 0) {
                return done(null, user[0]);
            }
            else {
                console.log("middleware fail");
                // response.redirect('/signin')
                return done(null, false);
            }
        }
        catch (error) {
            console.log(error);
            done(null, false);
        }
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.middleware.js.map