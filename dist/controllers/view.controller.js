"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.resetPassword = exports.forgotPassword = exports.postTweet = exports.editProfile = exports.userProfile = exports.singIn = exports.signup = exports.loginPassword = exports.dashboard = exports.identifier = exports.username = exports.password = exports.profilePic = exports.otpVerification = exports.basicInfo = exports.otpPage = exports.login = exports.home = void 0;
const home = (req, res) => {
    res.render("home");
};
exports.home = home;
const login = (req, res) => {
    res.render("login/identifier");
};
exports.login = login;
const otpPage = (req, res) => {
    res.render("otp");
};
exports.otpPage = otpPage;
const basicInfo = (req, res) => {
    res.render("register/basicInfo");
};
exports.basicInfo = basicInfo;
const otpVerification = (req, res) => {
    res.render("register/otpVerification");
};
exports.otpVerification = otpVerification;
const profilePic = (req, res) => {
    res.render("register/profilePic");
};
exports.profilePic = profilePic;
const password = (req, res) => {
    res.render("register/password");
};
exports.password = password;
const username = (req, res) => {
    res.render("register/username");
};
exports.username = username;
const identifier = (req, res) => {
    res.render("login/identifier");
};
exports.identifier = identifier;
const dashboard = (req, res) => {
    res.render("dashboard");
};
exports.dashboard = dashboard;
const loginPassword = (req, res) => {
    res.render("login/password");
};
exports.loginPassword = loginPassword;
const signup = (req, res) => {
    res.render("register/signup");
};
exports.signup = signup;
const singIn = (req, res) => {
    res.render("login/signIn");
};
exports.singIn = singIn;
const userProfile = (req, res) => {
    res.render("userProfile");
};
exports.userProfile = userProfile;
const editProfile = (req, res) => {
    res.render("editProfile");
};
exports.editProfile = editProfile;
const postTweet = (req, res) => {
    res.render("postTweet");
};
exports.postTweet = postTweet;
const forgotPassword = (req, res) => {
    res.render("forgotPassword");
};
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => {
    res.render('resetPassword');
};
exports.resetPassword = resetPassword;
const users = (req, res) => {
    res.render('users');
};
exports.users = users;
//# sourceMappingURL=view.controller.js.map