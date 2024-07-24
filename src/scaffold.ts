import * as fs from "fs";
import * as path from "path";
import { componentTemplates } from "./templates";
import { installComponentPackages } from "./utils/install-component-packages";
import { loadConfig } from "./config";
import { componentDependencies, validComponents, type ComponentName } from "./utils/get-list-components";
import { getNiceAdditions } from "./utils/get-nice-additions";
import { checkComponentDependencies } from "./utils/check-component-dependencies";
import * as stringSimilarity from "string-similarity";
import { FORM_LIB, PROGRAM_NAME } from "./constants";
import { colorize } from "./utils/colorize-log";

export async function scaffoldComponent(component: ComponentName) {
  const ora = (await import("ora")).default;
  const inquirer = (await import("inquirer")).default;

  const spinner = ora(`Scaffolding component ${component}...`).start();

  try {
    if (!validComponents.includes(component)) {
      await handleInvalidComponent(component, spinner, inquirer);
    }

    const config = loadConfig();
    const componentDir = path.join(process.cwd(), config.componentsDir);
    const componentFile = path.join(componentDir, `${component}.tsx`);

    // Ensure the component directory exists
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    const niceAdditions = getNiceAdditions(component);
    await scaffoldMainComponent(component, componentFile, spinner);
    await installNiceAdditions(niceAdditions, componentFile, spinner, inquirer);
    await installMainComponentDependencies(component, spinner);
    await installAdditionalDependencies(component, spinner);

    spinner.succeed(`Component ${component} scaffolded successfully.`);
  } catch (error) {
    handleError(error, spinner, component);
  }
}

async function handleInvalidComponent(component: ComponentName, spinner: any, inquirer: any) {
  spinner.stop();
  const matches = stringSimilarity.findBestMatch(component, [...validComponents]);
  const bestMatch = matches.bestMatch.target;

  if (matches.bestMatch.rating > 0.5) {
    const { useCorrectComponent } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useCorrectComponent",
        message: `Component "${component}" does not exist. Did you mean "${bestMatch}"?`,
        default: true,
      },
    ]);

    if (useCorrectComponent) {
      return scaffoldComponent(bestMatch as ComponentName);
    }
  }

  throw new Error(`Component "${component}" does not exist. Run "npx ${PROGRAM_NAME} list" to see all components.`);
}

async function scaffoldMainComponent(component: ComponentName, componentFile: string, spinner: any) {
  const componentTemplate = componentTemplates[component];
  fs.writeFileSync(componentFile, componentTemplate, "utf8");
  await installComponentPackages(component);
}

async function installNiceAdditions(niceAdditions: string[], componentFile: string, spinner: any, inquirer: any) {
  if (niceAdditions.length > 0) {
    spinner.stop();

    for (const addition of niceAdditions) {
      const { installAddition } = await inquirer.prompt([
        {
          type: "confirm",
          name: "installAddition",
          message: `Do you want to install ${colorize.orange(addition)} as well?`,
          default: true,
        },
      ]);
      if (installAddition) {
        const additionTemplate = componentTemplates[addition as ComponentName];
        fs.writeFileSync(componentFile, additionTemplate, "utf8"); // Overwrite content
        await installComponentPackages(addition as ComponentName);
        await installDependencies(addition as ComponentName);
      }
    }
  }
}

async function installDependencies(component: ComponentName) {
  const dependencies = componentDependencies[component] || [];
  for (const dependency of dependencies) {
    await scaffoldComponent(dependency as ComponentName);
    await installComponentPackages(dependency as ComponentName);
  }
}

async function installMainComponentDependencies(component: ComponentName, spinner: any) {
  const mainComponentDependencies = componentDependencies[component] || [];
  for (const dep of mainComponentDependencies) {
    await scaffoldComponent(dep as ComponentName);
    await installComponentPackages(dep as ComponentName);
  }
}

async function installAdditionalDependencies(component: ComponentName, spinner: any) {
  spinner.start(`Scaffolding component ${component}...`);
  const dependenciesToInstall = await checkComponentDependencies(component);
  for (const dep of dependenciesToInstall) {
    await scaffoldComponent(dep);
    await installComponentPackages(dep);
  }
}

function handleError(error: any, spinner: any, component: ComponentName) {
  if (error instanceof Error) {
    spinner.fail(error.message);
  } else {
    spinner.fail(`An unknown error occurred while scaffolding component ${component}.`);
  }
}
