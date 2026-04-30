import { Request, Response } from 'express';
export declare const sendOtp: (req: Request, res: Response) => Promise<void>;
export declare const optVerification: (req: Request, res: Response) => Promise<void>;
export declare const isUserNameExist: (req: Request, res: Response) => Promise<void>;
export declare const saveUser: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const uploadImage: (req: Request, res: Response) => Promise<void>;
export declare function googleCallBack(req: Request, res: Response): Promise<void>;
export declare function sendOtpToUi(req: Request, res: Response): Promise<void>;
export declare function updatePassword(req: Request, res: Response): Promise<void>;
export declare function forgotPassword(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map