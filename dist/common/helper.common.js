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
exports.genrateUserName = exports.uploadImage = exports.verifyJwtToken = exports.genrateJwtToken = exports.checkValidity = exports.sendOptViaMail = exports.compareHash = exports.genrateHash = exports.createOtp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const round = parseInt(process.env.ROUND);
const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
const createOtp = () => {
    return Math.floor(Math.random() * 1000000);
};
exports.createOtp = createOtp;
const genrateHash = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("----encode the text using bcrypt--");
    return yield bcrypt_1.default.hash(plainText, round);
});
exports.genrateHash = genrateHash;
const compareHash = (plainText, hashText) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--comparing  text in bcript");
    return yield bcrypt_1.default.compare(plainText, hashText);
});
exports.compareHash = compareHash;
const sendOptViaMail = (otp, otpId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--sending opt--");
});
exports.sendOptViaMail = sendOptViaMail;
const checkValidity = (time) => {
    console.log("ckeck otp validity");
    const genrationTime = new Date(time).getTime();
    const currentTime = new Date().getTime();
    const offset = 100 * 60 * 2;
    return (genrationTime + offset) > currentTime;
};
exports.checkValidity = checkValidity;
const genrateJwtToken = (payload) => {
    console.log("genrating user jwt token");
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refereshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refereshToken };
};
exports.genrateJwtToken = genrateJwtToken;
const verifyJwtToken = (token) => {
    console.log("verify jwt token");
    return jsonwebtoken_1.default.verify(token, jwtSecretKey);
};
exports.verifyJwtToken = verifyJwtToken;
const uploadImage = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.default.uploader.upload(path);
});
exports.uploadImage = uploadImage;
const genrateUserName = (name) => {
    return `${name}+123`;
};
exports.genrateUserName = genrateUserName;
//# sourceMappingURL=helper.common.js.map