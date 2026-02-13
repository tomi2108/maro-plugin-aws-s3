import { Command, Config, ValidateConfig } from "@maro/maro";

import { BucketConfig } from "../config";
import { Bucket } from "../lib/bucket";
import { bToGB } from "../lib/utils";

export const ListCommand: Command = {
  name: "list",
  description: "List s3 files",
  async run({ ctx }) {
    const config = Config.getView();
    const ui = ctx.ui;
    const log = ctx.logger;
    new ValidateConfig({ keys: ["s3.buckets"] }).run();
    const buckets_config = config.get("s3.buckets") as Record<string, BucketConfig>;
    const buckets = Object.entries(buckets_config).map(([name, opts]) => new Bucket(name, opts));

    if (buckets.length === 0) {
      log.warning("No buckets configured");
      return;
    }

    const bucket = await ui.promptChoice(buckets, { message: "Choose s3 bucket" });
    const files = await bucket.getFiles();
    const total_size = files.reduce((acc, f) => f.size + acc, 0);

    files?.forEach((f) => console.log(f.toString()));
    console.log("-".repeat(100));
    console.log(`Total size: ${bToGB(total_size).toFixed(2)}Gb`);
    console.log("-".repeat(100));
  }
};
