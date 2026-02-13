import { Command, Config, ValidateConfig } from "@maro/maro";

import { BucketConfig } from "../config";
import { Bucket } from "../lib/bucket";

export const GetMetadata: Command = {
  name: "metadata",
  description: "Get metadata from files",
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
    const choices = await bucket.getFiles();
    const files = await ui.promptChoice(choices, { message: "Choose files", multiple: true });
    const metadatas = await Promise.all(files.map((f) => f.getMetadata()));

    files?.forEach((f, i) => {
      const metadata = metadatas[i]!;
      const baseLine = f.toString();
      if (Object.keys(metadata).length === 0) return console.log(baseLine);
      const metaLines = Object.entries(metadata)
        .map(([k, v]) => `    ${k.padEnd(20, " ")} : ${v}`)
        .join("\n");
      console.log(`${baseLine}\n${metaLines}`);
    }
    );
  }
};
