import { createUtilsFile } from "./create-utils-file";
import { installRequiredPackages } from "./install-required-packages";
import { updateTailwindConfig } from "./update-tailwind-config";
import { getIsNextJsProject } from "./get-is-nextjs";

export async function initApp() {
  if (!getIsNextJsProject()) return;
  await installRequiredPackages();
  await createUtilsFile();
  await updateTailwindConfig();
}
