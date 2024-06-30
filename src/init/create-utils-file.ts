import path from "path";
import fs from "fs";
import { colorize } from "../utils/colorize-log";

export async function createUtilsFile() {
  const utilsDir = path.join(process.cwd(), "utils");
  const utilsFile = path.join(utilsDir, "utils.ts");
  const utilsContent = `
    import { clsx, type ClassValue } from "clsx";
    import { twMerge } from "tailwind-merge";
    
    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }
    `;

  try {
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }
    fs.writeFileSync(utilsFile, utilsContent);
    console.log(colorize.green(`utils.ts has been created successfully in the /utils directory.`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(colorize.red("An unknown error occurred while creating the utils.ts file."));
    }
  }
}
