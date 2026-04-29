import { ResultSetHeader } from "mysql2";
import { IOtp } from "../models/user.mode";
export declare const addOtp: (otp: IOtp) => Promise<ResultSetHeader>;
export declare const findOtpById: (otpId: number) => Promise<IOtp[]>;
export declare const setRefreshToken: (userId: number, refereshToken: string) => Promise<ResultSetHeader>;
export declare const createUserProfile: (userId: number) => Promise<void>;
//# sourceMappingURL=auth.repository.d.ts.map