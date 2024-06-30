import { createUtilsFile } from "./create-utils-file";
import { installRequiredPackages } from "./install-required-packages";
import { updateTailwindConfig } from "./update-tailwind-config";
import { getIsNextJsProject } from "./get-is-nextjs";
import { colorize } from "../utils/colorize-log";
import { askInputs } from "./ask-inputs";
import { saveConfig } from "../config";
import { updateTsConfigFile } from "./update-tsconfig";

export async function initApp() {
  try {
    await getIsNextJsProject();
    const { componentsDir, ...colors } = await askInputs();
    await installRequiredPackages();
    await createUtilsFile();
    await updateTsConfigFile();
    await updateTailwindConfig(colors);
    saveConfig({ componentsDir, ...colors });
    console.log(colorize.green("Project initialized successfully. 🎉🎉"));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error initializing project:", error.message);
    } else {
      console.error("An unknown error occurred while initializing the project.");
    }
  }
}
