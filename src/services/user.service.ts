import { ResultSetHeader } from 'mysql2';
import { IFollow, IOtp, IUser } from '../models/user.mode'
import * as userRepository from '../repositories/user.repository'



export const createUser=async(user:IUser)=>{
    return await userRepository.createUser(user);
}

export const updateUser=async(user:IUser)=>{
    return await userRepository.updateUser(user);
}

export const findByUserId=async(userId:number)=>{
    return await userRepository.findByUserId(userId);
}

export const getAllUser=async()=>{
    return await userRepository.getAllUser();
}



export const findUserName=async(userName:string):Promise<IUser[]>=>{
    return await userRepository.findUserByUserName(userName);
}

export const findUserEmail=async(userEmail:string):Promise<IUser[]>=>{
    return await userRepository.findUserEmail(userEmail)
}



export const findUserPhoneNumber=async(userPhoneNumber:string):Promise<IUser[]>=>{
    return await userRepository.findUserPhoneNumber(userPhoneNumber)
}



export const follow=async(follow:IFollow):Promise<ResultSetHeader>=>{
    return await userRepository.follow(follow);
}

export async function unFollow(follow: IFollow):Promise<ResultSetHeader> {
    return await userRepository.unFollow(follow);
}


export const findUserProfileByUserId=async(userId:number)=>{
    return await userRepository.findUserProfile(userId);
}