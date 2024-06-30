import path from "path";
import fs from "fs";
import { colorize } from "../utils/colorize-log";

interface Colors {
  primaryColor: string;
  secondaryColor: string;
}

export async function updateTailwindConfig(colors: Colors) {
  const tailwindConfig = path.join(process.cwd(), "tailwind.config.ts");

  try {
    fs.writeFileSync(tailwindConfig, tailwindConfigContent(colors));
    console.log(colorize.green("tailwind.config.ts has been updated successfully."));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(colorize.red("An unknown error occurred while updating tailwind.config.ts"));
    }
  }
}

const tailwindConfigContent = (colors: Colors) => `
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
            primary: "${colors.primaryColor}",
            secondary: "${colors.secondaryColor}",
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
