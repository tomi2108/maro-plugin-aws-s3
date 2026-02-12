import https from "node:https";

import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { Config } from "@maro/maro";

const insecureAgent = new https.Agent({
  rejectUnauthorized: false
});

export const s3 = ({ accesKey, secretKey }: { accesKey: string; secretKey: string }) => new S3Client({
  endpoint: Config.getView().get("s3.endpoint"),
  region: "us-east-1",
  forcePathStyle: true,
  credentials: {
    secretAccessKey: secretKey,
    accessKeyId: accesKey
  },
  requestHandler: new NodeHttpHandler({
    httpsAgent: insecureAgent
  })
});

