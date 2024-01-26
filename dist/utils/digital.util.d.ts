export declare class Digital {
    private s3;
    constructor();
    uploadFileOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    uploadImage(image: any, directory: string): Promise<string>;
    uploadPhotos(photos: any, directory: string): Promise<string[]>;
    getSignedS3Urls(objectKey: string): Promise<string>;
}
