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
exports.Auth = void 0;
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const user_model_1 = require("../models/user.model");
class Auth {
    constructor() {
        this.MAX_TOKEN_TIME = 600000;
    }
    generateVerificationCode(size = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
    decodeJwt(token) {
        console.log('token', token);
        return new Promise((resolve, reject) => {
            Jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    }
    /**
     *
     * @param data
     * @param expiresIn
     * @param next
     * @returns {Promise<string>}
     */
    getToken(data, expiresIn, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Jwt.sign(data, (0, env_1.env)().jwtSecret, {
                    expiresIn
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
     *
     * @param candidatePassword
     * @param userPassword
     * @returns {Promise<boolean>}
     */
    comparePassword(candidatePassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.compare(candidatePassword, userPassword, ((err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                }));
            });
        });
    }
    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    generateUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            let code = new Auth().generateVerificationCode(5);
            code = `UI${code}`;
            const isExist = yield user_model_1.default.exists({ userId: code });
            if (isExist) {
                code = yield this.generateUserId();
            }
            return code;
        });
    }
}
exports.Auth = Auth;
