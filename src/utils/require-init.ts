import path from "path";
import fs from "fs";

function getIsInitialized(): boolean {
  const rcPath = path.join(process.cwd(), ".pukisrc");
  if (!fs.existsSync(rcPath)) {
    return false;
  }

  try {
    const rcContent = JSON.parse(fs.readFileSync(rcPath, "utf8"));
    return rcContent.initialized === true;
  } catch (error) {
    return false;
  }
}

// Wrapper function to check initialization before running a command
export function requireInit(action: (...args: any[]) => void) {
  return (...args: any[]) => {
    if (!getIsInitialized()) {
      console.error("Error: Project not initialized. Please run `npx pukis init` first.");
      process.exit(1);
    }
    action(...args);
  };
}
