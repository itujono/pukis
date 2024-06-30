import path from "path";
import fs from "fs";
import { PROGRAM_NAME } from "../constants";

const getErrorMessage = (app: string) =>
  `At the moment, ${PROGRAM_NAME} is only available for ${app}. Please create a ${app} project first.`;

export async function getIsNextJsProject() {
  const ora = (await import("ora")).default;
  const spinner = ora("Checking if it's a Next.js project...").start();

  const isReactProject = getIsReactProject();
  if (!isReactProject) {
    spinner.fail(getErrorMessage("React.js"));
    return;
  }
  const configFiles = fs.readdirSync(process.cwd());
  const isNextJsProject = configFiles.some((file) => /^next\.config\.(js|ts|mjs)$/.test(file));

  if (!isNextJsProject) {
    spinner.fail(getErrorMessage("Next.js"));
    return;
  }
  spinner.succeed("Next.js project detected. Noice!");
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
