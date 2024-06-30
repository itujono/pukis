import { createUtilsFile } from "./create-utils-file";
import { installRequiredPackages } from "./install-required-packages";
import { updateTailwindConfig } from "./update-tailwind-config";
import { getIsNextJsProject } from "./get-is-nextjs";
import { colorize } from "../utils/colorize-log";

export async function initApp() {
  try {
    await getIsNextJsProject();
    await installRequiredPackages();
    await createUtilsFile();
    await updateTailwindConfig();
    console.log(colorize.green("Project initialized successfully. 🎉🎉"));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error initializing project:", error.message);
    } else {
      console.error("An unknown error occurred while initializing the project.");
    }
  }
}
