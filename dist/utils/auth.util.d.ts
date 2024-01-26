import { ObjectId } from "mongoose";
import { NextFunction } from "express";
export declare class Auth {
    MAX_TOKEN_TIME: number;
    generateVerificationCode(size?: number): string;
    decodeJwt(token: string): Promise<any>;
    /**
     *
     * @param data
     * @param expiresIn
     * @param next
     * @returns {Promise<string>}
     */
    getToken(data: {
        [key: string]: string | number | ObjectId;
    }, expiresIn: string | number, next: NextFunction): Promise<string>;
    /**
     *
     * @param candidatePassword
     * @param userPassword
     * @returns {Promise<boolean>}
     */
    comparePassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    encryptPassword(password: string): Promise<string>;
    generateUserId(): Promise<string>;
}
