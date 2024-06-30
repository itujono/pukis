import * as fs from "fs";
import * as path from "path";

const configFilePath = path.join(process.cwd(), "config.json");

export function saveConfig(config: Record<string, any>) {
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf8");
}

export function loadConfig(): Record<string, any> {
  if (fs.existsSync(configFilePath)) {
    const configFile = fs.readFileSync(configFilePath, "utf8");
    return JSON.parse(configFile);
  }
  return {};
}
