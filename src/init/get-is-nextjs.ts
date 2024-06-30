import path from "path";
import fs from "fs";
import { colorize } from "../utils/colorize-log";

export function getIsNextJsProject() {
  const isReactProject = getIsReactProject();
  if (!isReactProject) {
    return false;
  }
  const nextConfigJs = path.join(process.cwd(), "next.config.js");
  const nextConfigTs = path.join(process.cwd(), "next.config.ts");
  const isNextJsProject = fs.existsSync(nextConfigJs) || fs.existsSync(nextConfigTs);

  if (!isNextJsProject) {
    console.error("At the moment, this command is only available for Next.js. Please create a Next.js project first.");
    return false;
  }
  console.log(colorize.green("Next.js project detected. Noice!"));
}

export function getIsReactProject() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  return packageJson.dependencies && packageJson.dependencies.react;
}
