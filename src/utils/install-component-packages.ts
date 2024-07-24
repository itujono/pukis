import { PackageManager } from "../constants";
import type { ComponentName } from "./get-list-components";

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
  alert: ["class-variance-authority"],
  "alert-dialog": ["@radix-ui/react-alert-dialog"],
  badge: ["class-variance-authority"],
  button: ["class-variance-authority", "@radix-ui/react-slot"],
  calendar: ["@radix-ui/react-icons", "date-fns", "react-day-picker"],
  card: [],
  checkbox: ["@radix-ui/react-checkbox", "@radix-ui/react-icons"],
  datepicker: ["lucide-react"],
  dialog: ["@radix-ui/react-dialog", "@radix-ui/react-icons"],
  drawer: ["vaul"],
  "dropdown-menu": ["@radix-ui/react-dropdown-menu", "@radix-ui/react-icons"],
  "form-input": ["react-hook-form", "react-number-format"],
  form: ["@radix-ui/react-label", "@radix-ui/react-slot", "@hookform/resolvers", "react-hook-form", "zod"],
  input: [],
  "input-otp": ["input-otp"],
  label: ["class-variance-authority", "@radix-ui/react-label"],
  menubar: ["@radix-ui/react-menubar"],
  popover: ["@radix-ui/react-popover"],
  tabs: ["@radix-ui/react-tabs"],
  switch: ["@radix-ui/react-switch"],
  "form-switch": ["@radix-ui/react-switch", "react-hook-form", "zod"],
};
