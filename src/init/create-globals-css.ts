import path from "path";
import fs from "fs";
import { loadConfig } from "../config";

export async function createGlobalsCss() {
  const ora = (await import("ora")).default;
  const spinner = ora("Creating globals.css...").start();
  try {
    const config = loadConfig();
    const globalsCssDir = path.join(process.cwd(), config.globalsCssDir);
    if (!fs.existsSync(globalsCssDir)) fs.mkdirSync(globalsCssDir, { recursive: true });

    const globalsCssFile = path.join(globalsCssDir, "globals.css");

    // Always write the file, even if it exists
    fs.writeFileSync(globalsCssFile, globalsCssContent, "utf8");

    spinner.succeed("globals.css created.");
  } catch (error) {
    console.error("Error details:", error);
    if (error instanceof Error) {
      spinner.fail(`Error creating globals.css: ${error.message}`);
    } else {
      spinner.fail("An unknown error occurred while creating globals.css.");
    }
  }
}

const globalsCssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth text-black;
  }

  body {
    @apply font-sans text-black;
  }

  h1 {
    @apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-sans text-black;
  }

  h2 {
    @apply scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 font-sans text-black;
  }

  h3 {
    @apply scroll-m-20 text-2xl font-semibold tracking-tight font-sans text-black;
  }

  h4 {
    @apply scroll-m-20 text-xl font-semibold tracking-tight font-sans text-black;
  }

  p {
    @apply leading-7 font-sans text-black;
  }

  a {
    @apply leading-7 font-sans text-black hover:text-slate-500;
  }
}
`;
