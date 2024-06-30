#!/usr/bin/env node

import { Command } from "commander";
import { scaffoldComponent } from "./scaffold";
import { PROGRAM_NAME } from "./constants";
import { version } from "../package.json";
import { initApp } from "./init";
import { colorize } from "./utils/colorize-log";

const program = new Command();

program.name(PROGRAM_NAME).description("CLI to scaffold React components").version(version);

program
  .command("init")
  .description("Initialize the project")
  .action(async () => {
    try {
      await initApp();
      console.log(colorize.green("Project initialized successfully. 🎉🎉"));
    } catch (error) {
      console.error(colorize.red("An unknown error occurred while initializing the project."));
    }
  });

program
  .command("add <component>")
  .description("Add a new React component")
  .action((component) => {
    try {
      scaffoldComponent(component);
      console.log(colorize.green(`Component ${component} has been created successfully.`));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(colorize.red("An unknown error occurred while creating the component."));
      }
    }
  });

// Handle unknown commands
program.on("command:*", (operands) => {
  console.error(colorize.red(`Error: Unknown command '${operands[0]}'`));
  program.outputHelp(); // Display help information
});

program.parse(process.argv);
