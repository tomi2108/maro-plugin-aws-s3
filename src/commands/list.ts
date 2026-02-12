import { Bucket } from "src/config";

import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Command, Config, ValidateConfig } from "@maro/maro";

import { s3 } from "../s3";

export const ListCommand: Command = {
  name: "list",
  description: "List s3 files",
  async run({ ctx }) {
    const config = Config.getView();
    const ui = ctx.ui;
    const log = ctx.logger;
    new ValidateConfig({ keys: ["s3.buckets"] }).run();
    const buckets = config.get("s3.buckets") as Record<string, Bucket>;

    const choices = Object.entries(buckets).map(([name, value]) => ({
      toChoice() {
        return { name };
      },
      ...value
    }));

    if (choices.length === 0) {
      log.warning("No buckets configured");
      return;
    }

    const bucket = await ui.promptChoice(choices, { message: "Choose s3 bucket" });
    const client = s3({ accesKey: bucket.accessKey, secretKey: bucket.secretKey });
    const command = new ListObjectsV2Command({ Bucket: bucket.bucket });
    const res = await client.send(command);
    console.log(res);
  }
};
