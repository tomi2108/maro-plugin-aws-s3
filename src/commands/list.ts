
import { Command } from "@maro/maro";

import { bToGB } from "../lib/utils";
import { PromptForBucket } from "../steps/PromptBucket";

export const ListCommand: Command = {
  name: "list",
  aliases: ["ls"],
  description: "List s3 files",
  async run({ ctx }) {
    const { bucket } = await new PromptForBucket().run(ctx);
    if (!bucket) return;

    const files = await bucket.getFiles();
    const total_size = files.reduce((acc, f) => f.size + acc, 0);

    files?.forEach((f) => console.log(f.toString()));
    console.log("-".repeat(100));
    console.log(`Total size: ${bToGB(total_size).toFixed(2)}Gb`);
    console.log("-".repeat(100));
  }
};
