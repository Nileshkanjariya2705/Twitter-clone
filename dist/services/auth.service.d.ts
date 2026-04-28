import { ResultSetHeader } from 'mysql2';
import { IOtp } from '../models/user.mode';
export declare const saveRefreshTokenInDB: (userId: number, refreshToken: string) => Promise<ResultSetHeader>;
export declare const addOtpTODatabase: (opt: IOtp) => Promise<ResultSetHeader>;
export declare const findOtpById: (otpId: number) => Promise<IOtp[]>;
//# sourceMappingURL=auth.service.d.ts.map