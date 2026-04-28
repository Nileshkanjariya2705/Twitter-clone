import { ResultSetHeader } from 'mysql2';
import { IOtp } from '../models/user.mode';
import * as authRepository from '../repositories/auth.repository'


export const saveRefreshTokenInDB=async(userId:number,refreshToken:string):Promise<ResultSetHeader>=>{
    return await authRepository.setRefreshToken(userId,refreshToken);
}


export const addOtpTODatabase=async(opt:IOtp):Promise<ResultSetHeader>=>{
    return await authRepository.addOtp(opt);
}

export const findOtpById=async(otpId:number):Promise<IOtp[]>=>{
    return await authRepository.findOtpById(otpId)
}
