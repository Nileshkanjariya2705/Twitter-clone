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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth.controller"));
const passport_middleware_1 = __importDefault(require("../middlewares/passport.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.use(passport_middleware_1.default.initialize());
authRouter.post("/sendOtp", authController.sendOtp);
authRouter.post("/otpVerification", authController.optVerification);
authRouter.post("/checkOtp", authController.checkOpt);
authRouter.post("/isUserNameExist", authController.isUserNameExist);
authRouter.post("/addUser", authController.saveUser);
authRouter.post("/isEmailExist", authController.isEmailExists);
authRouter.post("/login", authController.login);
authRouter.get("/upload", authController.uploadImage);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.get('/getOtp', authController.sendOtpToUi);
authRouter.post('/updatePassword', authController.updatePassword);
authRouter.get('/google', passport_middleware_1.default.authenticate('google'));
authRouter.get('/google/callback', passport_middleware_1.default.authenticate('google', { session: false }), authController.googleCallBack);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map