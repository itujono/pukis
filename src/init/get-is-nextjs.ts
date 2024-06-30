import path from "path";
import fs from "fs";
import { colorize } from "../utils/colorize-log";
import { PROGRAM_NAME } from "../constants";

export async function getIsNextJsProject() {
  const isReactProject = getIsReactProject();
  if (!isReactProject) {
    throw new Error(`At the moment, ${PROGRAM_NAME} is only available for React.js. Please create a React.js project first.`);
  }
  const configFiles = fs.readdirSync(process.cwd());
  const isNextJsProject = configFiles.some((file) => /^next\.config\.(js|ts|mjs)$/.test(file));

  if (!isNextJsProject) {
    throw new Error(`At the moment, ${PROGRAM_NAME} is only available for Next.js. Please create a Next.js project first.`);
  }
  console.log(colorize.green("Next.js project detected. Noice!"));
}

function getIsReactProject() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error("package.json not found.");
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const isReact = packageJson.dependencies && packageJson.dependencies.react;
  if (!isReact) {
    console.error("React dependency not found in package.json.");
  }
  return isReact;
}
