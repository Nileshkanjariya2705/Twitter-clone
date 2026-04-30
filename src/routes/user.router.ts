
import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import * as tweetController from '../controllers/tweet.controller'
import upload from '../config/multer';


const userRouter =Router();


userRouter.post("/addTweet",upload.array('photos',2),tweetController.addTweet)
userRouter.get("/getAllTweets",tweetController.getAllTweets)

userRouter.get("/getAllTweetsOfUser",tweetController.getAllOfUser)
userRouter.get("/getOneTweet/:tweetId",tweetController.getTweetByTweetId)
userRouter.delete("/deleteTweet/:tweetId",tweetController.deleteTweetByTweetId)
userRouter.put("/updateTweet/:tweetId",tweetController.updateTweet)



userRouter.get("/likeTweet/:tweetId",tweetController.likeTweet)
userRouter.get("/unLikeTweet/:tweetId",tweetController.unLikeTweet)


userRouter.get("/follow/:userId",userController.follow)
userRouter.get("/unFollow/:userId",userController.unFollow)


userRouter.get("/getAllUsers",userController.getAllUser)

userRouter.post("/updateProfile",userController.userProfile)

userRouter.get('/getUserProfile',userController.findUserProfileByUserId)

userRouter.get('/reTweet/:tweetId',tweetController.reTweet)

userRouter.post('/saveUserProfile',upload.array('photos', 2),userController.saveUserProfile)



userRouter.get('/logout',userController.logout)
export default userRouter;