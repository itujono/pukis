import path from "path";
import fs from "fs";
import { colorize } from "../utils/colorize-log";

import { loadConfig } from "../config";

export async function createUtilsFile() {
  const config = loadConfig();

  if (!config.utilsDir) {
    throw new Error("`utilsDir` is not defined in the config file.");
  }

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
    console.log(colorize.green(`utils.ts has been created successfully in the ${config.utilsDir} directory.`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(colorize.red(`Error creating utils.ts file: ${error.message}`));
      throw error;
    } else {
      console.error(colorize.red("An unknown error occurred while creating the utils.ts file."));
      throw new Error("An unknown error occurred while creating the utils.ts file.");
    }
  }
}
