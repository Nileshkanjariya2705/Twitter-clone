import { IPayload } from '../models/user.mode';
import jwt from 'jsonwebtoken';
export declare const createOtp: () => number;
export declare const genrateHash: (plainText: string) => Promise<string>;
export declare const compareHash: (plainText: string, hashText: string) => Promise<boolean>;
export declare const sendOptViaMail: (otp: number, otpId: number) => Promise<void>;
export declare const checkValidity: (time: string) => boolean;
export declare const genrateJwtToken: (payload: IPayload) => {
    accessToken: string;
    refereshToken: string;
};
export declare const verifyJwtToken: (token: string) => string | jwt.JwtPayload;
export declare const uploadImage: (path: string) => Promise<import("cloudinary").UploadApiResponse>;
export declare const genrateUserName: (name: string) => string;
export declare const decodeToken: (token: string) => string | jwt.JwtPayload | null;
//# sourceMappingURL=helper.common.d.ts.map