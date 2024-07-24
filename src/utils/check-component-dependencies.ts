import * as fs from "fs";
import * as path from "path";
import { loadConfig } from "../config";
import { type ComponentName, componentDependencies } from "./get-list-components";
import { colorize } from "./colorize-log";

const FILE_EXT = ".tsx";

export async function checkComponentDependencies(component: ComponentName): Promise<ComponentName[]> {
  const dependencies = componentDependencies[component] || [];

  if (dependencies.length === 0) return [];

  const config = loadConfig();
  const componentDir = path.join(process.cwd(), config.componentsDir);
  const missingDependencies = dependencies.filter((dep) => !fs.existsSync(path.join(componentDir, `${dep}${FILE_EXT}`)));

  if (missingDependencies.length > 0) {
    const inquirer = (await import("inquirer")).default;
    const { installDeps } = await inquirer.prompt([
      {
        type: "confirm",
        name: "installDeps",
        message: `${colorize.orange(component)} component requires ${missingDependencies.join(" and ")} component(s) to be installed first. Do you want to install them?`,
        default: true,
      },
    ]);

    if (installDeps) {
      return missingDependencies;
    } else {
      throw new Error(`${component} installation cancelled. Required components were not installed.`);
    }
  }

  return [];
}
