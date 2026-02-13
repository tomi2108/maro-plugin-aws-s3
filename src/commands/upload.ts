
import { Command } from "@maro/maro";

import { PromptForBucket } from "../steps/PromptBucket";

export const UploadCommand: Command = {
  name: "upload",
  aliases: ["up"],
  description: "Upload file to s3",
  async run({ ctx }) {
    const ui = ctx.ui;
    const { bucket } = await new PromptForBucket().run(ctx);
    if (!bucket) return;

    const currentDir = ctx.cwd;
    const files = currentDir.readFiles();

    const file = await ui.promptChoice(files, { message: "Select file" });
    await bucket.upload(file);
  }
};
