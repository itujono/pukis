import path from "path";
import fs from "fs";

import { loadConfig } from "../config";

export async function createUtilsFile() {
  const config = loadConfig();
  const ora = (await import("ora")).default;

  if (!config.utilsDir) {
    throw new Error("`utilsDir` is not defined in the config file.");
  }

  const spinner = ora("Creating utils.ts file...").start();

  const utilsDir = path.join(process.cwd(), config.utilsDir);
  const utilsFile = path.join(utilsDir, "utils.ts");
  const utilsContent = `
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  `;

  try {
    if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });
    fs.writeFileSync(utilsFile, utilsContent);
    spinner.succeed(`utils.ts created in ${config.utilsDir}`);
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(`Error creating utils.ts file: ${error.message}`);
      throw error;
    } else {
      spinner.fail("An unknown error occurred while creating the utils.ts file.");
      throw new Error("An unknown error occurred while creating the utils.ts file.");
    }
  }
}
