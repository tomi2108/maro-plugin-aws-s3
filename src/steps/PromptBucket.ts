import { Config, ExecutionContext, ValidateConfig, WorkflowStep } from "@maro/maro";

import { BucketConfig } from "../config";
import { Bucket } from "../lib/bucket";

type Reads = {};
type Writes = { bucket?: Bucket };
type Options = {};
export class PromptForBucket extends WorkflowStep<Reads, Writes, Options> {

  async run(ctx: ExecutionContext) {
    new ValidateConfig({ keys: ["s3.buckets"] }).run();

    const ui = ctx.ui;
    const log = ctx.logger;
    const config = Config.getView();

    const buckets_config = config.get("s3.buckets") as Record<string, BucketConfig>;
    const buckets = Object.entries(buckets_config).map(([name, opts]) => new Bucket(name, opts));

    if (buckets.length === 0) {
      log.warning("No buckets configured");
      return {};
    }

    const bucket = await ui.promptChoice(buckets, { message: "Choose s3 bucket" });
    return { bucket };
  }
}
