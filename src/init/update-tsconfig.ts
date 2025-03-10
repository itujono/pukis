import path from "path";
import fs from "fs";

export async function updateTsConfigFile() {
  const ora = (await import("ora")).default;
  const spinner = ora("Updating tsconfig.json...").start();
  const tsConfigFile = path.join(process.cwd(), "tsconfig.json");

  if (!fs.existsSync(tsConfigFile)) {
    spinner.fail("tsconfig.json file not found");
    return;
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
  spinner.succeed("tsconfig.json has been updated successfully.");
}
