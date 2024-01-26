import * as fs from 'fs';
import { S3 } from 'aws-sdk';
import { env } from '../environments/env';


export class FileUpload {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: env().awsAccessKey,
      secretAccessKey: env().awsSecretKey,
    });
  }

  async uploadFileOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {
    console.log(env().awsAccessKey,'access--------------');
    console.log(env().awsSecretKey,'awsSecretKey--------------');
    
    try {
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: env().s3Bucket,
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }
  
  async uploadPdfOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {
    try {
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: env().s3Bucket,
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }
  
  async removeFileFromS3(fileRemoteName: string): Promise<boolean> {
    try {

      console.log(fileRemoteName);
      const params = {
        Bucket: env().s3Bucket,
        Key: fileRemoteName
      }
      await this.s3.deleteObject(params);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async copyFilesOnS3(
    copySource: string,
    toDirectory: string
  ) {
    try {
      const params = {
        Bucket: env().s3Bucket,
        CopySource: copySource,
        Key: toDirectory
      }
      const newUrl = await this.s3.copyObject(params);
      return newUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  async uploadBase64OnS3(
    base64: string,
    directory: string,
    fileName: string
  ) {
    try {

      const fileRemoteName = `${directory}/${fileName}`;
      console.log(fileRemoteName);
      const s3Object = {
        Bucket: env().s3Bucket,
        Body: base64,
        Key: fileRemoteName,
        ContentType: 'image/png',
        ACL: 'public-read'
      }

      return await this.s3.putObject(s3Object).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });

    } catch (error) {
      console.log(error);
      return '';
    }
  }
  async uploadxlsFileOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {
    try {
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: env().s3Bucket,
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }

  async uploadImage(
    image: any,
    directory: string
): Promise<string> {
    const fileName = `${Date.now()}-${image.originalFilename}`;
    return await this.uploadFileOnS3(image, directory, fileName)
}
 async uploadPhotos(photos: any, directory: string): Promise<string[]> {
  console.log(photos, "photo");
  const photosUrl: string[] = [];
  if (Array.isArray(photos)) {
    for (const photo of photos) {

      photosUrl.push(await this.uploadImage(photo, directory))
    }
  }
  else if (photos) {
    photosUrl.push(await this.uploadImage(photos, directory))
  }
  return photosUrl;
}
}

