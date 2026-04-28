
import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import passport from '../middlewares/passport.middleware';

import * as viewController from '../controllers/view.controller';

const authRouter=Router();
authRouter.use(passport.initialize())
authRouter.post("/sendOtp",authController.sendOtp);
authRouter.post("/otpVerification",authController.optVerification);
authRouter.post("/isUserNameExist",authController.isUserNameExist);
authRouter.post("/addUser",authController.saveUser);

authRouter.post("/login",authController.login);
authRouter.get("/upload",authController.uploadImage)



authRouter.get('/google',passport.authenticate('google'))
authRouter.get('/google/callback',passport.authenticate('google',{session:false}),authController.googleCallBack)

export default authRouter;