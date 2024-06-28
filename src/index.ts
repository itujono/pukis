#!/usr/bin/env node

import { Command } from "commander";
import { scaffoldComponent } from "./scaffold";
import { PROGRAM_NAME } from "./constants";

const program = new Command();

program
  .name(PROGRAM_NAME)
  .description("CLI to scaffold React components")
  .version("1.0.0");

program
  .command("add <component>")
  .description("Add a new React component")
  .action((component) => {
    try {
      scaffoldComponent(component);
      console.log(`Component ${component} has been created successfully.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  });

// Handle unknown commands
program.on("command:*", (operands) => {
  console.error(`Error: Unknown command '${operands[0]}'`);
  program.outputHelp(); // Display help information
});

program.parse(process.argv);
