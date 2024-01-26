import { model, Schema } from 'mongoose';
import { AdminInterface } from '../interfaces/admin.interface';

const AdminSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePic:{
        type:String
    },
    verification_code:{
        type:String
    }

}, { timestamps: true });

const AdminModel = model<AdminInterface>('admin', AdminSchema);

export default AdminModel;