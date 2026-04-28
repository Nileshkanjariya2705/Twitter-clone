import { ResultSetHeader } from "mysql2";
import { IFollow, IUser, IUserProfile } from "../models/user.mode";
export declare const findByUserId: (userId: number) => Promise<IUser[]>;
export declare const getAllUser: () => Promise<IUser[]>;
export declare const createUser: (user: IUser) => Promise<ResultSetHeader>;
export declare const updateUser: (user: IUser) => Promise<ResultSetHeader>;
export declare const findUserByUserName: (userName: string) => Promise<IUser[]>;
export declare const findUserEmail: (userEmail: string) => Promise<IUser[]>;
export declare const findUserPhoneNumber: (userPhoneNumber: string) => Promise<IUser[]>;
export declare const follow: (follow: IFollow) => Promise<ResultSetHeader>;
export declare function unFollow(follow: IFollow): Promise<ResultSetHeader>;
export declare const findUserProfile: (userId: number) => Promise<IUserProfile[]>;
//# sourceMappingURL=user.repository.d.ts.map