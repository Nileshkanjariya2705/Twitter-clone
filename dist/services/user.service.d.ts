import { ResultSetHeader } from 'mysql2';
import { IFollow, IUser, IUserProfile } from '../models/user.mode';
export declare const createUser: (user: IUser) => Promise<ResultSetHeader>;
export declare const updateUser: (user: IUser) => Promise<ResultSetHeader>;
export declare const findByUserId: (userId: number) => Promise<IUser[]>;
export declare const getAllUser: (userId: number) => Promise<IUser[]>;
export declare const findUserName: (userName: string) => Promise<IUser[]>;
export declare const findUserEmail: (userEmail: string) => Promise<IUser[]>;
export declare const findUserPhoneNumber: (userPhoneNumber: string) => Promise<IUser[]>;
export declare const follow: (follow: IFollow) => Promise<ResultSetHeader>;
export declare function unFollow(follow: IFollow): Promise<ResultSetHeader>;
export declare const findUserProfileByUserId: (userId: number) => Promise<IUserProfile[]>;
export declare function updateUserProfile(userProfile: IUserProfile): Promise<import("mysql2").QueryResult>;
export declare function isFollow(follow: IFollow): Promise<boolean>;
export declare const updatePassword: (userId: number, password: string) => Promise<import("mysql2").QueryResult>;
//# sourceMappingURL=user.service.d.ts.map