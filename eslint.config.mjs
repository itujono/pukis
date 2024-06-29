import tsParser from "@typescript-eslint/parser";
import espree from "espree";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("prettier"), {
    rules: {
        "tailwindcss/no-custom-classname": "off",
        "tailwindcss/classnames-order": "error",
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        parser: tsParser,
    },
}, {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
        parser: espree,
    },
}];