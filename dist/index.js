#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const scaffold_1 = require("./scaffold");
const constants_1 = require("./constants");
const program = new commander_1.Command();
program
    .name(constants_1.PROGRAM_NAME)
    .description("CLI to scaffold React components")
    .version("1.0.0");
program
    .command("add <component>")
    .description("Add a new React component")
    .action((component) => {
    try {
        (0, scaffold_1.scaffoldComponent)(component);
        console.log(`Component ${component} has been created successfully.`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
program.parse(process.argv);
