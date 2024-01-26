export interface Environment {
    dbUrl: string;
    jwtSecret?: string;
    jwtExpiresIn?: string;
    awsAccessKey?: string;
    awsSecretKey?: string;
    s3Bucket?: string;
    s3AssetUrl?: string;
    awsRegion?: string;
    slackToken?: string;
    sendGridApiKey?: string;
    webUrl?: string;
    twilio_sid?: string;
    twilio_auth_token?: string;
    verify_email_endpoint?: string;
    reset_email_endpoint?: string;
}
export declare function env(): Environment;
