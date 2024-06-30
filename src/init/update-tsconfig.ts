import path from "path";
import fs from "fs";

export async function updateTsConfigFile() {
  const tsConfigFile = path.join(process.cwd(), "tsconfig.json");

  if (!fs.existsSync(tsConfigFile)) {
    throw new Error("tsconfig.json file not found");
  }

  // Look for `compilerOptions.paths` and `baseUrl`
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigFile, "utf8"));
  const compilerOptions = tsConfig.compilerOptions || {};
  const paths = compilerOptions.paths || {};

  paths["@/*"] = ["./src/*"];
  compilerOptions.paths = paths;

  if (!compilerOptions.baseUrl) {
    compilerOptions.baseUrl = ".";
  }

  tsConfig.compilerOptions = compilerOptions;
  fs.writeFileSync(tsConfigFile, JSON.stringify(tsConfig, null, 2), "utf8");
}
