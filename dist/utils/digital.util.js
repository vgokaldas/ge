"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digital = void 0;
const fs = require("fs");
const AWS = require("aws-sdk");
class Digital {
    constructor() {
        const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com'); // Find your endpoint in the control panel, under Settings. Prepend "https://".
        this.s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: 'DO00G6XZVPETU9UJCKMR',
            secretAccessKey: 'FMLI87xddZZpayE9SGoBSfgCWe/P+Ttuess06NPJuqc'
        });
    }
    uploadFileOnS3(file, directory, fileName, fileStream) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath);
                const fileRemoteName = `${directory}/${fileName}`;
                return yield this.s3.putObject({
                    Bucket: 'afreen1234',
                    Body: file_stream,
                    ContentType: file.mimetype,
                    Key: fileRemoteName,
                    // ACL: 'public-read'
                    ACL: 'private'
                }).promise()
                    .then(res => {
                    console.log(res, 'uploaded successfully------');
                    return fileRemoteName;
                });
            }
            catch (err) {
                console.log('failed:', err);
                return '';
            }
        });
    }
    uploadImage(image, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${image.originalFilename}`;
            return yield this.uploadFileOnS3(image, directory, fileName);
        });
    }
    uploadPhotos(photos, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(photos, "photo");
            const photosUrl = [];
            if (Array.isArray(photos)) {
                for (const photo of photos) {
                    photosUrl.push(yield this.uploadImage(photo, directory));
                }
            }
            else if (photos) {
                photosUrl.push(yield this.uploadImage(photos, directory));
            }
            return photosUrl;
        });
    }
    getSignedS3Urls(objectKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectParams = { Bucket: "afreen1234", Key: objectKey };
            const res = this.s3.getSignedUrl("getObject", objectParams);
            return res;
        });
    }
}
exports.Digital = Digital;
