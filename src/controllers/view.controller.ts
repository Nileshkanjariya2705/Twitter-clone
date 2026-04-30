import { Request,Response } from "express";

export const home=(req:Request,res:Response)=>{
    res.render("home")
}


export const login=(req:Request,res:Response)=>{
    res.render("login/identifier")
}


export const otpPage=(req:Request,res:Response)=>{
    res.render("otp")
}
export const basicInfo=(req:Request,res:Response)=>{
    res.render("register/basicInfo")
}


export const otpVerification=(req:Request,res:Response)=>{
    res.render("register/otpVerification")
}


export const profilePic=(req:Request,res:Response)=>{
    res.render("register/profilePic")
}

export const password=(req:Request,res:Response)=>{
    res.render("register/password")
}

export const username=(req:Request,res:Response)=>{
    res.render("register/username")
}


export const identifier=(req:Request,res:Response)=>{
    res.render("login/identifier")
}

export const dashboard=(req:Request,res:Response)=>{
    res.render("dashboard")
}

export const loginPassword=(req:Request,res:Response)=>{
    res.render("login/password")
}

export const signup=(req:Request,res:Response)=>{
    res.render("register/signup")
}

export const singIn=(req:Request,res:Response)=>{
    res.render("login/signIn")
}

export const userProfile=(req:Request,res:Response)=>{
    res.render("userProfile")
}

export const editProfile=(req:Request,res:Response)=>{
    res.render("editProfile")
}

export const postTweet=(req:Request,res:Response)=>{
    res.render("postTweet")
}

export const forgotPassword=(req:Request,res:Response)=>{
    res.render("forgotPassword")
}
export const resetPassword=(req:Request,res:Response)=>{
    res.render('resetPassword')
}
