let otp:any={}

export const getOtp=()=>{
    return otp.otpNumber;
}

export const setOtp=(otpId:number,otpNumber:number)=>{
    otp.otpId=otpId
    otp.otpNumber=otpNumber
}