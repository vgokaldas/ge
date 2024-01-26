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
exports.Email = void 0;
const axios_1 = require("axios");
const env_1 = require("../environments/env");
class Email {
    constructor(email, dynamicTemplateData) {
        this.apiUrl = "https://api.sendgrid.com/v3/mail/send";
        this.toEmail = email;
        this.dynamicTemplateData = dynamicTemplateData;
        this.apiKey = (0, env_1.env)().sendGridApiKey;
    }
    send(templateId) {
        return new Promise((resolve, reject) => {
            const data = {
                from: {
                    email: "aziz_assad@yahoo.com",
                },
                personalizations: [
                    {
                        to: [
                            {
                                email: this.toEmail,
                            },
                        ],
                        dynamic_template_data: this.dynamicTemplateData,
                    },
                ],
                template_id: templateId,
            };
            const config = {
                method: "post",
                url: this.apiUrl,
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                data,
            };
            (0, axios_1.default)(config)
                .then((res) => {
                return resolve(true);
            })
                .catch((error) => {
                return reject(error);
            });
        });
    }
    sendVerification() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send("d-e00f990fdfeb444888752857bfa4ed1b");
        });
    }
}
exports.Email = Email;
