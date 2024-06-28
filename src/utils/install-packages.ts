import { ComponentName } from "../scaffold";

export async function installPackages(component: ComponentName) {
  const packages = componentPackages[component];

  if (!packages.length) {
    console.log("No packages to install for component " + component);
    return;
  }

  try {
    console.log("Installing packages...");
    const { execa } = await import("execa");
    await execa("npm", ["install", ...packages]);
    console.log("Packages installed successfully.");
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to install packages: " + error.message);
    throw new Error("Failed to install packages: " + String(error));
  }
}

export const componentPackages = {
  Button: ["class-variance-authority", "@radix-ui/react-slot"],
  Label: ["class-variance-authority", "@radix-ui/react-label"],
  Card: [],
};
