import { scaffoldComponent } from "../scaffold";
import { validComponents } from "./get-list-components";

// Split array into chunks
const chunk = (arr: string[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

export async function installAllComponents() {
  const ora = (await import("ora")).default;
  const inquirer = (await import("inquirer")).default;
  const chalk = (await import("chalk")).default;
  const boxen = (await import("boxen")).default;

  // Split components into 3 columns
  const columns = chunk([...validComponents], Math.ceil(validComponents.length / 3));

  // Pad columns to equal length
  const maxLength = Math.max(...columns.map((col) => col.length));
  const paddedColumns = columns.map((col) => [...col, ...Array(maxLength - col.length).fill("")]);

  let componentList = "";
  for (let i = 0; i < maxLength; i++) {
    componentList += paddedColumns.map((col) => (col[i] ? `- ${col[i].padEnd(20)}` : "".padEnd(22))).join("") + "\n";
  }

  const boxedList = boxen(componentList, {
    padding: 1,
    margin: 1,
    borderColor: "green",
    borderStyle: "round",
  });

  console.log("This will install all available components:");
  console.log(boxedList);

  console.log("\n");

  const { proceed } = await inquirer.prompt([
    {
      type: "list",
      name: "proceed",
      message: "Do you want to proceed with the installation? (Use arrow keys)",
      choices: [{ name: chalk.green("Yes"), value: true }, { name: chalk.red("No"), value: false }, new inquirer.Separator()],
    },
  ]);

  console.log("\n");

  if (!proceed) {
    console.log("Installation cancelled.");
    return;
  }

  const spinner = ora("Installing all available components...");

  for (const component of validComponents) {
    spinner.text = `Installing ${component}...`;
    await scaffoldComponent(component);
  }

  spinner.stop();
  console.log("\nAll components have been installed successfully!");
}
