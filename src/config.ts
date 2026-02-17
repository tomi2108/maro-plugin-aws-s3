import z from "zod/v4";

import { ConfigHelp, ConfigSection } from "@maro/maro";

export type BucketConfig = {
  accessKey: string;
  secretKey: string;
  bucket: string;
};

const schema = z.object({
  endpoint: z.string(),
  buckets: z.record(
    z.string(),
    z.object({
      accessKey: z.string(),
      secretKey: z.string(),
      bucket: z.string()
    })).optional()
});

export class S3Config implements ConfigSection {
  key = "s3";

  validate(config: unknown) {
    if (!config) return {};
    return schema.parse(config);
  }

  help(): ConfigHelp[] {
    return [
      { key: "endpoint", description: "S3 endpoint URL", type: "string" },
      { key: "buckets", description: "Named S3 bucket configurations", type: "object" },
      { key: "buckets.${name}.accessKey", description: "Access key for the bucket", type: "string" },
      { key: "buckets.${name}.secretKey", description: "Secret key for the bucket", type: "string" },
      { key: "buckets.${name}.bucket", description: "Bucket name", type: "string" }
    ];
  }

  async setup() {
    return {};
  }

}
