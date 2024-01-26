import { env } from "../environments/env";

class SendSms {

    private otp: string;
    private countryCode: string;
    private phoneNumber: string;

    constructor(otp: string,countryCode:string, phoneNumber: string){
        this.otp = otp;
        this.phoneNumber = phoneNumber;
        this.countryCode = countryCode;
    }

     async sendOTP() {
        try {
            const accountSid = env().twilio_sid;
            const authToken = env().twilio_auth_token;
            // const phone = user.countryCode + user.phoneNumber;            
            const client = require('twilio')(accountSid, authToken);

           let text=`Your OTP for phone number verification is :- ${this.otp}`;
            console.log("text",text);
            console.log(this.countryCode,this.phoneNumber);
            
           await client.messages
                .create({
                    body: text,
                    from:'9852875098',
                    to: `${this.countryCode}${this.phoneNumber}`
                    // to:'+966567718628' 
                    // to:'+919882552978' 
                })
                .then((message: any) => console.log('otp sent', message));
        } catch (error) {
            console.log('error',error);            
        }
    }
}

export default SendSms;