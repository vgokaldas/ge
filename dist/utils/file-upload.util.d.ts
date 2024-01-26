import { S3 } from 'aws-sdk';
export declare class FileUpload {
    private s3;
    constructor();
    uploadFileOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    uploadPdfOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    removeFileFromS3(fileRemoteName: string): Promise<boolean>;
    copyFilesOnS3(copySource: string, toDirectory: string): Promise<false | import("aws-sdk").Request<S3.CopyObjectOutput, import("aws-sdk").AWSError>>;
    uploadBase64OnS3(base64: string, directory: string, fileName: string): Promise<string>;
    uploadxlsFileOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    uploadImage(image: any, directory: string): Promise<string>;
    uploadPhotos(photos: any, directory: string): Promise<string[]>;
}
