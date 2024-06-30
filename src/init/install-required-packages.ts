import { colorize } from "../utils/colorize-log";

export async function installRequiredPackages() {
  const { execa } = await import("execa");
  const packages = ["tailwindcss", "clsx", "tailwind-merge", "tailwindcss-animate"];
  try {
    console.log("Installing required packages...");
    const { stderr } = await execa("npm", ["install", ...packages]);
    if (stderr) {
      console.error("Error installing required packages:", stderr);
    }
    console.log(colorize.green("Required packages installed successfully."));
  } catch (error: any) {
    console.error("Error installing required packages:", error);
    if (error.stdout) console.error("stdout:", error.stdout);
    if (error.stderr) console.error("stderr:", error.stderr);
    console.error("Failed to install required packages. Please install them manually.");
  }
}
