import * as fs from 'fs';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk'

export class Digital {
  private s3: S3;
  constructor() {

    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com'); // Find your endpoint in the control panel, under Settings. Prepend "https://".
    this.s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: 'DO00G6XZVPETU9UJCKMR',
      secretAccessKey: 'FMLI87xddZZpayE9SGoBSfgCWe/P+Ttuess06NPJuqc'
    });
  }

  async uploadFileOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {

    try {
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: 'afreen1234',
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        // ACL: 'public-read'
        ACL: 'private'
      }).promise()
        .then(res => {
          console.log(res,'uploaded successfully------');
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

  async getSignedS3Urls(objectKey: string): Promise<string> {
    const objectParams = { Bucket: "afreen1234", Key: objectKey };
    const res = this.s3.getSignedUrl("getObject", objectParams);
    return res
}

}