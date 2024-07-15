import * as fs from "fs";
import * as path from "path";
import { componentTemplates } from "./templates";
import { installComponentPackages } from "./utils/install-component-packages";
import { loadConfig } from "./config";
import { validComponents, ComponentName } from "./utils/get-list-components";

export async function scaffoldComponent(component: ComponentName) {
  const ora = (await import("ora")).default;
  const spinner = ora(`Scaffolding component ${component}...`).start();

  try {
    if (!validComponents.includes(component)) {
      throw new Error(`Component ${component} does not exist. Please choose from: ${validComponents.join(", ")}`);
    }

    await installComponentPackages(component);

    const config = loadConfig();

    const componentDir = path.join(process.cwd(), config.componentsDir);
    const componentFile = path.join(componentDir, `${component}.tsx`);

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    const componentTemplate = componentTemplates[component];

    fs.writeFileSync(componentFile, componentTemplate, "utf8");

    spinner.succeed(`Component ${component} scaffolded successfully.`);
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(`Error scaffolding component ${component}: ${error.message}`);
    } else {
      spinner.fail(`An unknown error occurred while scaffolding component ${component}.`);
    }
  }
}
