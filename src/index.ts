import { PluginExport } from "@maro/maro";

import { ListCommand } from "./commands/list";
import { GetMetadata } from "./commands/metadata";
import { S3Config } from "./config";

const Plugin: PluginExport = {
  name: "maro-plugin-aws-s3",
  configs: [
    new S3Config()
  ],
  commands: [
    {
      name: "s3",
      subcommands: [
        ListCommand,
        GetMetadata
      ]
    }
  ]
};

export default Plugin;
