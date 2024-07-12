import * as fs from "fs";
import * as path from "path";

export const defaultConfig = {
  componentsDir: "src/components/ui",
  utilsDir: "src/lib",
  primaryColor: "#051800",
  secondaryColor: "#369E5A",
  globalsCssDir: "src/app",
};

type Config = Record<keyof typeof defaultConfig, any>;

export function saveConfig(config: Partial<Config>) {
  const configPath = path.join(process.cwd(), "config.json");
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  let existingConfig = defaultConfig;
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, "utf8");
    existingConfig = JSON.parse(configFile);
  }

  const newConfig = { ...existingConfig, ...config };
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf8");
}

export function loadConfig(): Config {
  const configPath = path.join(process.cwd(), "config.json");
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf8");
  }

  const configFile = fs.readFileSync(configPath, "utf8");
  const config = JSON.parse(configFile);

  // Validate that all required properties are present
  const requiredProperties = Object.keys(defaultConfig);
  for (const prop of requiredProperties) {
    if (!(prop in config)) {
      throw new Error(`'${prop}' is not defined in the config file.`);
    }
  }

  return config;
}
