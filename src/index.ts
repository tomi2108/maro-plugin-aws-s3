import { ConfigRegistry, PluginExport } from "@maro/maro";

import { DeleteCommand } from "./commands/delete";
import { ListCommand } from "./commands/list";
import { GetMetadata } from "./commands/metadata";
import { UploadCommand } from "./commands/upload";
import { S3Config } from "./config";

const Plugin: PluginExport = {
  name: "maro-plugin-aws-s3",
  onLoad() {
    ConfigRegistry.register(new S3Config());
  },
  commands: [
    {
      name: "s3",
      subcommands: [
        ListCommand,
        GetMetadata,
        UploadCommand,
        DeleteCommand
      ]
    }
  ]
};

export default Plugin;
