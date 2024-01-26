declare class SendSms {
    private otp;
    private countryCode;
    private phoneNumber;
    constructor(otp: string, countryCode: string, phoneNumber: string);
    sendOTP(): Promise<void>;
}
export default SendSms;
