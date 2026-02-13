import { Command } from "@maro/maro";

import { PromptForBucket } from "../steps/PromptBucket";

export const GetMetadata: Command = {
  name: "metadata",
  description: "Get metadata from files",
  async run({ ctx }) {
    const ui = ctx.ui;

    const { bucket } = await new PromptForBucket().run(ctx);
    if (!bucket) return;

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
