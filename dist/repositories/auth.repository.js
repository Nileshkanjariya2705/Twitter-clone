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
exports.setRefreshToken = exports.findOtpById = exports.addOtp = void 0;
const db_1 = __importDefault(require("../config/db"));
const addOtp = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`insert into otp
    (identifier,otp)
    values(?,?)
        `, [
        otp.identifier,
        otp.otp_hash,
    ]);
    return resultSet;
});
exports.addOtp = addOtp;
const findOtpById = (otpId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield (yield db_1.default).query('select * from otp where otpId=?', [otpId]);
    return result;
});
exports.findOtpById = findOtpById;
const setRefreshToken = (userId, refereshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const [resultSet] = yield (yield db_1.default).query(`update users set refreshToken=? where userId=?`, [refereshToken, userId]);
    return resultSet;
});
exports.setRefreshToken = setRefreshToken;
//# sourceMappingURL=auth.repository.js.map