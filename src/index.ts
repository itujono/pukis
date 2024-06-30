#!/usr/bin/env node

import { Command } from "commander";
import { scaffoldComponent } from "./scaffold";
import { PROGRAM_NAME, PROGRAM_DESCRIPTION } from "./constants";
import { version } from "../package.json";
import { initApp } from "./init";
import { colorize } from "./utils/colorize-log";

const program = new Command();

program.name(PROGRAM_NAME).description(PROGRAM_DESCRIPTION).version(version);

program.command("init").description("Initialize the project").action(initApp);

program
  .command("add <component>")
  .description("Add a new React component")
  .action(async (component) => {
    try {
      await scaffoldComponent(component);
      console.log(colorize.green(`✅ ${component} added.`));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(colorize.red("❌ An unknown error occurred while creating the component."));
      }
    }
  });

// Handle unknown commands
program.on("command:*", (operands) => {
  console.error(`Error: Unknown command '${operands[0]}'`);
  program.outputHelp(); // Display help information
});

program.parse(process.argv);
