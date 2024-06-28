"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentPackages = void 0;
exports.installPackages = installPackages;
function installPackages(component) {
    return __awaiter(this, void 0, void 0, function* () {
        const packages = exports.componentPackages[component];
        if (!packages.length) {
            console.log("No packages to install for component " + component);
            return;
        }
        try {
            console.log("Installing packages...");
            const { execa } = yield import("execa");
            yield execa("npm", ["install", ...packages]);
            console.log("Packages installed successfully.");
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error("Failed to install packages: " + error.message);
            throw new Error("Failed to install packages: " + String(error));
        }
    });
}
exports.componentPackages = {
    Button: ["class-variance-authority", "@radix-ui/react-slot"],
    Label: ["class-variance-authority", "@radix-ui/react-label"],
    Card: [],
};
