import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

interface EnvironmentVariables {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
}

@Injectable()
class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const accessKeyId =
      this.configService.get('AWS_ACCESS_KEY_ID', {
        infer: true,
      }) ?? '';
    const secretAccessKey =
      this.configService.get('AWS_SECRET_ACCESS_KEY', {
        infer: true,
      }) ?? '';

    const region = this.configService.get('AWS_REGION', {
      infer: true,
    });

    this.bucket =
      this.configService.get('AWS_BUCKET_NAME', {
        infer: true,
      }) ?? '';

    this.s3Client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
  }

  async deleteFile(folder: string, filename: string): Promise<void> {
    const input = {
      Bucket: this.bucket,
      Key: `${folder}/${filename}`,
    };

    const command = new DeleteObjectCommand(input);

    try {
      await this.s3Client.send(command);
    } catch (error) {
      Logger.error(`Failed to delete file ${filename} from S3`, error);
      throw error;
    }
  }

  async uploadFile(folder: string, filename: string, file: any): Promise<void> {
    const path = `${folder}/${filename}`;

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: `${path}`,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(input);

    try {
      await this.s3Client.send(command);
    } catch (error) {
      Logger.error(`Failed to upload file ${filename} to S3`, error);
      throw error;
    }
  }
}

export { S3Service };
