import { PluginExport } from "@maro/maro";

import { ListCommand } from "./commands/list";
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
        ListCommand
      ]
    }
  ]
};

export default Plugin;
