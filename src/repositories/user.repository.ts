import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/db"
import { IFollow, IOtp, IUser, IUserProfile } from "../models/user.mode";


export const findByUserId=async(userId:number):Promise<IUser[]>=>{
    const [resultSet]=await (await connection).query<IUser[] & RowDataPacket[][]>('select * from users where userId=?',[userId])
    return resultSet;
}


export const getAllUser=async():Promise<IUser[]>=>{
    const [resultSet]=await (await connection).query<IUser[] & RowDataPacket[][]>('select * from users ')
    return resultSet;
}

export const createUser=async(user:IUser):Promise<ResultSetHeader>=>{
    const [resultSet]=await (await connection).query<ResultSetHeader>(`insert into users
        (userFullName,userEmail,userPhoneNumber,userDateOfBirth,userPassword,userName,provider,providerId)
        values(?,?,?,?,?,?,?,?)
        `,[user.userFullName,user.userEmail || null,user.userPhoneNumber ||null,user.userDateOfBirth || null,user.userPassword||null,user.userName ,user.provider,user.providerId||null]);
    return resultSet;
}

export const updateUser=async(user:IUser):Promise<ResultSetHeader>=>{
    const [resultSet]=await (await connection).query<ResultSetHeader>(`update users
        set userName=?,
        userEmail=?,
        userFullName=?
        where userId=?
        `,[user.userName,user.userEmail,user.userFullName,user.userId])
    return resultSet;
}




export const findUserByUserName=async(userName:string):Promise<IUser[]>=>{
    const [resultSet]= await (await connection).query<IUser[] & RowDataPacket[][]>(`select * from users where userName=?`,[userName])
    return resultSet;
    
}

export const findUserEmail=async(userEmail:string):Promise<IUser[]>=>{
    const [resultSet]=await (await connection).query<IUser[] & RowDataPacket[][]>(`select * from users where userEmail=?`,[userEmail])
    return resultSet;
}



export const findUserPhoneNumber=async(userPhoneNumber:string):Promise<IUser[]>=>{
    const [resultSet]=await (await connection).query<IUser[] & RowDataPacket[][]>(`select * from users where userPhoneNumber=?`,[userPhoneNumber])
    return resultSet;
}





export const follow=async(follow:IFollow):Promise<ResultSetHeader>=>{
    const [result]=await (await connection).query<ResultSetHeader>(`insert into userFollows (followerId,followingId) values(?,?)`,[follow.followerId,follow.followingId]);
    return result;
}


export async function unFollow(follow: IFollow):Promise<ResultSetHeader> {
    const [result]=await (await connection).query<ResultSetHeader>(`delete from userFollows where followerId=? and  followingId=?`,[follow.followerId,follow.followingId]);
    return result;
}

export const findUserProfile=async(userId:number):Promise<IUserProfile[]>=>{
    const [result]=await (await connection).query<IUserProfile[] & RowDataPacket[][]>(`select * from userProfile where userId=?`,[userId])
    return result;
}

export async function updateUserProfile(userProfile: IUserProfile) {
    const [result]=await (await connection).query(`update userProfile 
        set userCoverImageUrl=?,
        userProfilePicUrl=?,
        userBio=?
        where userId=?
        `,[userProfile.userCoverImageUrl,userProfile.userProfilePicUrl,userProfile.userBio,userProfile.userId])
        return result;
}


export async function isFollow(followerId: number, followingId: number) {
    const [result]=await (await connection).query(`select count(*) as count where followerId=? and followingId=?`,[followerId,followingId])
    return result
}
