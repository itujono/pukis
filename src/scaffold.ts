import * as fs from "fs";
import * as path from "path";
import { componentTemplates } from "./templates";
import { installPackages } from "./utils/install-packages";

export const validComponents = ["Button", "Label", "Card"] as const;
export type ComponentName = (typeof validComponents)[number];

export async function scaffoldComponent(component: ComponentName) {
  if (!validComponents.includes(component)) {
    throw new Error(
      `Component ${component} does not exist. Please choose from: ${validComponents.join(
        ", "
      )}`
    );
  }

  await installPackages(component);

  const componentDir = path.join(process.cwd(), "src", "components", component);
  const componentFile = path.join(componentDir, `${component}.tsx`);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const componentTemplate = componentTemplates[component];

  fs.writeFileSync(componentFile, componentTemplate, "utf8");
}
