export declare class Email {
    private toEmail;
    private dynamicTemplateData;
    private apiUrl;
    private apiKey;
    constructor(email: string, dynamicTemplateData: DynamicTemplateData);
    private send;
    sendVerification(): Promise<boolean>;
}
declare type DynamicTemplateData = {
    [key: string]: any;
};
export {};
