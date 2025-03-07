import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    private readonly s3Client = new S3Client({
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    });

    public async upload(key: string, file: Express.Multer.File) {
        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }),
            );
            return `${process.env.S3_PUBLIC_DOMAIN}/${key}`;
        } catch (e) {
            console.error(e);
        }
    }
}
