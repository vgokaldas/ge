"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function env() {
    return {
        dbUrl: process.env.DB_URL,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        awsAccessKey: process.env.AWS_KEY,
        awsSecretKey: process.env.AWS_SECRET,
        s3Bucket: process.env.S3_BUCKET,
        s3AssetUrl: process.env.S3_ASSET_URL,
        awsRegion: process.env.AWS_REGION,
        sendGridApiKey: process.env.SENDGRID_API_KEY,
        webUrl: process.env.WEB_URL,
        twilio_sid: process.env.TWILIO_SID,
        twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
        verify_email_endpoint: process.env.VERIFY_EMAIL_END_POINT,
        reset_email_endpoint: process.env.RESET_EMAIL_END_POINT
    };
}
exports.env = env;
