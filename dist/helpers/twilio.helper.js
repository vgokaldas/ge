"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../environments/env");
class SendSms {
    constructor(otp, countryCode, phoneNumber) {
        this.otp = otp;
        this.phoneNumber = phoneNumber;
        this.countryCode = countryCode;
    }
    sendOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountSid = (0, env_1.env)().twilio_sid;
                const authToken = (0, env_1.env)().twilio_auth_token;
                // const phone = user.countryCode + user.phoneNumber;            
                const client = require('twilio')(accountSid, authToken);
                let text = `Your OTP for phone number verification is :- ${this.otp}`;
                console.log("text", text);
                console.log(this.countryCode, this.phoneNumber);
                yield client.messages
                    .create({
                    body: text,
                    from: '9852875098',
                    to: `${this.countryCode}${this.phoneNumber}`
                    // to:'+966567718628' 
                    // to:'+919882552978' 
                })
                    .then((message) => console.log('otp sent', message));
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
}
exports.default = SendSms;
