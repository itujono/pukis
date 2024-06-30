import { PackageManager } from "../constants";
import { colorize } from "../utils/colorize-log";

const packages = ["tailwindcss", "clsx", "tailwind-merge", "tailwindcss-animate"];

export async function installRequiredPackages() {
  const { execa } = await import("execa");
  const ora = (await import("ora")).default;
  const spinner = ora("Installing required packages...").start();

  try {
    const child = execa(PackageManager.NAME, [PackageManager.INSTALL, ...packages], {
      timeout: 150000,
    }); // 2.5 minutes timeout

    const { stdout, stderr } = await child;
    if (stderr) {
      console.error("Error installing required packages:", stderr);
      spinner.fail("Failed to install required packages.");
    }
    console.log(stdout);
    spinner.succeed("Required packages installed successfully.");
  } catch (error: any) {
    console.error("Error installing required packages:", error);
    if (error.stdout) console.error("stdout:", error.stdout);
    if (error.stderr) console.error("stderr:", error.stderr);
    spinner.fail("Failed to install required packages. Please install them manually.");
  }
}
