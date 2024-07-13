import fs from "fs";
import path from "path";
import { version } from "../../package.json";
import * as config from "../config";

// Create a .pukisrc file with initialization info
export function createRcFile() {
  const { componentsDir, ...colors } = config.loadConfig();
  const pukisrcContent = JSON.stringify(
    {
      initialized: true,
      initTimestamp: new Date().toISOString(),
      pukisVersion: version,
      componentsDir,
      colors,
    },
    null,
    2
  );

  fs.writeFileSync(path.join(process.cwd(), ".pukisrc"), pukisrcContent);
}
