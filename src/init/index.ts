import { createUtilsFile } from "./create-utils-file";
import { installRequiredPackages } from "./install-required-packages";
import { updateTailwindConfig } from "./update-tailwind-config";
import { getIsNextJsProject } from "./get-is-nextjs";
import { colorize } from "../utils/colorize-log";
import { askInputs } from "./ask-inputs";
import { saveConfig } from "../config";
import { updateTsConfigFile } from "./update-tsconfig";
import { createGlobalsCss } from "./create-globals-css";
import { PROGRAM_NAME } from "../constants";
import { createRcFile } from "./createRcFile";

export async function initApp() {
  try {
    await getIsNextJsProject();
    const { componentsDir, ...colors } = await askInputs();
    await installRequiredPackages();
    await createUtilsFile();
    await updateTsConfigFile();
    createGlobalsCss();
    await updateTailwindConfig(colors);
    saveConfig({ componentsDir, ...colors });

    createRcFile();

    console.log(
      colorize.green(
        `
        

Project initialized successfully 🎉🎉.

Next, why don't you try adding a component e.g. \`npx ${PROGRAM_NAME} add Button\`, \`npx ${PROGRAM_NAME} add Card\`, etc.

`
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error initializing ${PROGRAM_NAME}:`, error.message);
    } else {
      console.error(`An unknown error occurred while initializing ${PROGRAM_NAME}.`);
    }
  }
}
