import { Router } from "express";
import * as viewController from '../controllers/view.controller'



const viewRouter=Router();


// viewRouter.get("/",viewController.home)
// viewRouter.get("/login",viewController.login)
viewRouter.get("/otp",viewController.otpPage)
viewRouter.get("/user/allUsers",viewController.users)
viewRouter.get("/resetPassword",viewController.resetPassword)
// viewRouter.get("/register/basicInfo",viewController.basicInfo)
// viewRouter.get("/register/otpVerification",viewController.otpVerification)
// viewRouter.get("/register/password",viewController.password)
// viewRouter.get("/register/profilePic",viewController.profilePic)
// viewRouter.get("/register/userName",viewController.username)
// viewRouter.get("/login/identifier",viewController.identifier)
viewRouter.get("/user/dashboard",viewController.dashboard)
// viewRouter.get("/login/password",viewController.loginPassword)

viewRouter.get("/",viewController.signup)
viewRouter.get("/signin",viewController.singIn)
viewRouter.get("/user/profile",viewController.userProfile)
viewRouter.get("/user/editProfile",viewController.editProfile)
viewRouter.get("/user/postTweet",viewController.postTweet)

viewRouter.get("/forgotPassword",viewController.forgotPassword)

export default viewRouter;