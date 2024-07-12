import { PackageManager } from "../constants";
import type { ComponentName } from "../scaffold";

export async function installComponentPackages(component: ComponentName) {
  const packages = componentPackages[component];

  if (!packages.length) return;

  const ora = (await import("ora")).default;
  const spinner = ora(`Installing packages for ${component}...`).start();

  try {
    const { execa } = await import("execa");
    const child = execa(PackageManager.NAME, [PackageManager.INSTALL, ...packages], {
      timeout: 150000,
    });
    await child;
    spinner.succeed(`Packages for ${component} installed.`);
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to install packages: " + error.message);
    throw new Error("Failed to install packages: " + String(error));
  }
}

const componentPackages: Record<ComponentName, string[]> = {
  Button: ["class-variance-authority", "@radix-ui/react-slot"],
  Label: ["class-variance-authority", "@radix-ui/react-label"],
  Card: [],
  Input: [],
  Alert: ["class-variance-authority"],
  Badge: ["class-variance-authority"],
  Checkbox: ["@radix-ui/react-checkbox", "@radix-ui/react-icons"],
  Dialog: ["@radix-ui/react-dialog", "@radix-ui/react-icons"],
  Drawer: ["vaul"],
  DropdownMenu: ["@radix-ui/react-dropdown-menu", "@radix-ui/react-icons"],
  InputOTP: ["input-otp"],
};
