import fs from "fs";
import path from "path";
import { colorize } from "./utils/colorize-log";

export async function initApp() {
  await installRequiredPackages();
  await createUtilsFile();
  await updateTailwindConfig();
}

async function createUtilsFile() {
  const utilsDir = path.join(process.cwd(), "utils");
  const utilsFile = path.join(utilsDir, "utils.ts");
  const utilsContent = `
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  `;

  try {
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }
    fs.writeFileSync(utilsFile, utilsContent);
    console.log(colorize.green(`utils.ts has been created successfully in the /utils directory. 🎉🎉`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(colorize.red("An unknown error occurred while creating the utils.ts file."));
    }
  }
}

async function installRequiredPackages() {
  const { execa } = await import("execa");
  const packages = ["tailwindcss", "clsx", "tailwind-merge", "tailwindcss-animate"];
  try {
    console.log("Installing required packages...");
    await execa("npm", ["install", ...packages]);
    console.log(colorize.green("Required packages installed successfully. 🎉🎉"));
  } catch (error) {
    console.error(colorize.red("Failed to install required packages. Please install them manually."));
  }
}

async function updateTailwindConfig() {
  const tailwindConfig = path.join(process.cwd(), "tailwind.config.ts");
  const tailwindConfigContent = `
    import type { Config } from "tailwindcss";
    import colors from "tailwindcss/colors";
    import { fontFamily } from "tailwindcss/defaultTheme";

    const config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
        },
        colors: {
            primary: "#051800",
            secondary: "#369E5A",
            black: "#000",
            white: "#fff",
            transparent: "transparent",
            current: "currentColor",
            danger: colors.red[500],
            success: colors.green[500],
            warning: colors.yellow[500],
            info: colors.blue[500],
            slate: colors.slate,
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
    } satisfies Config;

    export default config;
  `;

  try {
    fs.writeFileSync(tailwindConfig, tailwindConfigContent);
    console.log(colorize.green("tailwind.config.ts has been updated successfully. 🎉🎉"));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(colorize.red("An unknown error occurred while updating tailwind.config.ts"));
    }
  }
}
