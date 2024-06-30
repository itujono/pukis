import { PackageManager } from "../constants";
import type { ComponentName } from "../scaffold";

export async function installComponentPackages(component: ComponentName) {
  const packages = componentPackages[component];

  if (!packages.length) {
    return;
  }

  try {
    console.log("Installing packages...");
    const { execa } = await import("execa");
    const child = execa(PackageManager.NAME, [PackageManager.INSTALL, ...packages], {
      timeout: 150000,
    });
    const { stdout, stderr } = await child;
    console.log({ stdout });
    console.log({ stderr });
    console.log(`Packages for ${component} installed.`);
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to install packages: " + error.message);
    throw new Error("Failed to install packages: " + String(error));
  }
}

const componentPackages: Record<ComponentName, string[]> = {
  Button: ["class-variance-authority", "@radix-ui/react-slot"],
  Label: ["class-variance-authority", "@radix-ui/react-label"],
  Card: [],
};
