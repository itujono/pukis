import { colorize } from "../utils/colorize-log";

export async function installRequiredPackages() {
  const { execa } = await import("execa");
  const packages = ["tailwindcss", "clsx", "tailwind-merge", "tailwindcss-animate"];
  try {
    console.log("Installing required packages...");
    const { stdout, stderr } = await execa("npm", ["install", ...packages]);
    console.log({ stdout });
    if (stderr) {
      console.error({ stderr });
    }
    console.log(colorize.green("Required packages installed successfully."));
  } catch (error) {
    console.error({ error: error as any });
    if ((error as any).stdout) {
      console.error("stdout:", (error as any).stdout);
    }
    if ((error as any).stderr) {
      console.error("stderr:", (error as any).stderr);
    }
    console.error("Failed to install required packages. Please install them manually.");
  }
}
