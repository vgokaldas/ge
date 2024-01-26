import { Document, ObjectId } from 'mongoose';

export interface SessionInterface extends Document {
    user: ObjectId | string,
    isActive: boolean;
    deviceType: DeviceType;
    deviceToken: string;
    deviceId: string;
    deviceName: string;
    createdAt: Date
}


export enum DeviceType {
    ios = 'IOS',
    android = 'ANDROID',
    web = 'WEB'
}