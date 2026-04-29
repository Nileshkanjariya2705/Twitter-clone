import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/db"
import { IFollow, IOtp, IUser } from "../models/user.mode";




export const addOtp=async(otp:IOtp):Promise<ResultSetHeader>=>{
    const [resultSet]=await (await connection).query<ResultSetHeader>(`insert into otp
    (identifier,otp)
    values(?,?)
        `,[
            otp.identifier,
            otp.otp_hash,
        ]);
     return resultSet;   
}


export const findOtpById=async(otpId:number):Promise<IOtp[]>=>{
    const [result]=await (await connection).query<IOtp[] & RowDataPacket[][]>('select * from otp where otpId=?',[otpId])
    return result;
}



export const setRefreshToken=async(userId:number,refereshToken:string):Promise<ResultSetHeader>=>{
    const [resultSet]=await (await connection).query<ResultSetHeader>(`update users set refreshToken=? where userId=?`,[refereshToken,userId])
    return resultSet;
}



export const createUserProfile=async(userId:number)=>{
    const [result]=await (await connection).query(`insert into userProfile (userId) values(?)`,[userId])
}