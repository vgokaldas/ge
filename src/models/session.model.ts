import { Schema, model, Types } from 'mongoose';

const SessionSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    vendor: {
       type: Types.ObjectId,
       ref: 'vendor'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deviceType: {
        type: String,
    },
    deviceToken: {
        type: String,
    },
    deviceId: {
        type: String
    },
    deviceName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

const SessionModel = model('session', SessionSchema);

export default SessionModel;