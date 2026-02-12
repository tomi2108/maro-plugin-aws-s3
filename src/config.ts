import z from "zod/v4";

import { ConfigSection } from "../../../dist/lib";
import { ConfigHelp } from "../../../dist/lib/config/interface";

export type Bucket = {
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
    return [];
  }

  async setup() {
    return {};
  }

}
