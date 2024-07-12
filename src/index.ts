#!/usr/bin/env node

import { Command } from "commander";
import { scaffoldComponent } from "./scaffold";
import { PROGRAM_NAME, PROGRAM_DESCRIPTION } from "./constants";
import { version } from "../package.json";
import { initApp } from "./init";
import { getListComponents } from "./utils/get-list-components";
import { installAllComponents } from "./utils/install-all";

const program = new Command();

program.name(PROGRAM_NAME).description(PROGRAM_DESCRIPTION).version(version);

program.command("init").description("Initialize the project").action(initApp);

program.command("add <component>").description("Add a new React component").action(scaffoldComponent);

program.command("list").description("List all available components").action(getListComponents);

program.command("install-all").description("Install all available components").action(installAllComponents);

// Handle unknown commands
program.on("command:*", (operands) => {
  console.error(`Error: Unknown command '${operands[0]}'`);
  program.outputHelp(); // Display help information
});

program.parse(process.argv);
