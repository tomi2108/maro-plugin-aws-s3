import { Command } from "@maro/maro";

import { PromptForBucket } from "../steps/PromptBucket";

export const DeleteCommand: Command = {
  name: "delete",
  aliases: ["del"],
  description: "Delete file from s3",
  async run({ ctx }) {
    const ui = ctx.ui;

    const { bucket } = await new PromptForBucket().run(ctx);
    if (!bucket) return;

    const choices = await bucket.getFiles();
    const file = await ui.promptChoice(choices, { message: "Choose file" });
    await bucket.delete(file);
  }
};
