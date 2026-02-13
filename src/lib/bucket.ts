import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { loading } from "@maro/maro";

import { BucketConfig } from "../config";
import { s3 } from "../s3";
import { S3File } from "./file";

export class Bucket {
  private s3: S3Client;
  name: string;
  accessKey: string;
  secretKey: string;
  bucket: string;

  constructor(name: string, opts: BucketConfig) {
    this.name = name;
    this.accessKey = opts.accessKey;
    this.secretKey = opts.secretKey;
    this.bucket = opts.bucket;
    this.s3 = s3({ accesKey: this.accessKey, secretKey: this.secretKey });
  }

  toChoice() {
    return { name: this.name };
  }

  @loading("Getting files")
  async getFiles() {
    const files: S3File[] = [];
    let continuationToken: string | undefined;

    do {
      const res = await this.s3.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          MaxKeys: 1000,
          ContinuationToken: continuationToken
        })
      );

      if (res.Contents) {
        const resolved = res.Contents.map((r) => S3File.fromS3Response(this.s3, this.bucket, r));
        files.push(...resolved);
      }

      continuationToken = res.NextContinuationToken;
    } while (continuationToken);

    files.sort(
      (a, b) => a.lastModified.valueOf() - b.lastModified.valueOf()
    );
    return files;
  }

}
