"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validComponents = void 0;
exports.scaffoldComponent = scaffoldComponent;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const templates_1 = require("./templates");
exports.validComponents = ["Button", "Input", "Card"];
function scaffoldComponent(component) {
    if (!exports.validComponents.includes(component)) {
        throw new Error(`Component ${component} does not exist. Please choose from: ${exports.validComponents.join(", ")}`);
    }
    const componentDir = path.join(process.cwd(), "src", "components", component);
    const componentFile = path.join(componentDir, `${component}.tsx`);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }
    const componentTemplate = templates_1.componentTemplates[component];
    fs.writeFileSync(componentFile, componentTemplate, "utf8");
}
