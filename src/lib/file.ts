import { _Object, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { bToKb } from "./utils";

export class S3File {

  static fromS3Response(s3: S3Client, bucket: string, res: _Object) {
    const { Key, LastModified, Size } = res;
    if (
      !Key
      || !LastModified
      || Size === undefined
    ) throw new Error("Invalid s3 response");

    return new S3File(
      s3,
      bucket,
      Key,
      LastModified,
      Size
    );
  }

  private constructor(
    private s3: S3Client,
    private bucket: string,
    public name: string,
    public lastModified: Date,
    public size: number
  ) {
  }

  async getMetadata() {
    const head = await this.s3.send(
      new HeadObjectCommand({ Bucket: this.bucket, Key: this.name })
    );

    return head.Metadata ?? {};
  }

  toString() {
    const dateStr = this.lastModified.toISOString();
    const nameStr = this.name.padEnd(40, " ");
    const sizeStr = bToKb(this.size).toFixed(2).padStart(6, " ");

    return `${dateStr}  ${nameStr}  ${sizeStr}Kb`;
  }

  toChoice() {
    return { name: this.name };
  }

}
