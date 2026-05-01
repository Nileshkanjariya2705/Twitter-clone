import dotenv from 'dotenv';
import express from 'express'
import ejs from 'ejs'
import path from 'path';
dotenv.config()
import viewRouter from "./routes/view.router"
import authRouter from './routes/auth.router';
import passport from './middlewares/passport.middleware'
import userRouter from './routes/user.router';
import cookieParser from 'cookie-parser';
import multer from 'multer';
    import { fileURLToPath } from 'url';

const app=express()



// process.cwd() returns the root folder where you run the 'node' command
const rootDir = process.cwd();

// Set views directory
app.set('views', path.join(rootDir, 'src/views'));

// Set static files directory
app.use(express.static(path.join(rootDir, 'public')));

app.use(cookieParser())
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
// app.set("views","/home/nilesh-kanjariya/Twitter/Twitter/src/views")
// app.use(express.static(path.join("/home/nilesh-kanjariya/Twitter/","public")))



app.use("/",viewRouter)
app.use("/auth",authRouter);
app.use("/user",passport.authenticate('jwt',{session:false}),userRouter)
// app.use("/user",passport.authenticate('jwt',{session:false}),userRouter)

export default app;