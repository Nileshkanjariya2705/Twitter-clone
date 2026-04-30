"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOtp = exports.getOtp = void 0;
let otp = {};
const getOtp = () => {
    return otp.otpNumber;
};
exports.getOtp = getOtp;
const setOtp = (otpId, otpNumber) => {
    otp.otpId = otpId;
    otp.otpNumber = otpNumber;
};
exports.setOtp = setOtp;
//# sourceMappingURL=otpManage.js.map