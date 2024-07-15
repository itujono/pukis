export const validComponents = [
  "Button",
  "Label",
  "Card",
  "Input",
  "Alert",
  "Badge",
  "Checkbox",
  "Dialog",
  "Drawer",
  "DropdownMenu",
  "InputOTP",
  "Form",
  "MenuBar",
  "FormInput",
] as const;

export type ComponentName = (typeof validComponents)[number];

export function getListComponents() {
  console.log("Available components:");
  validComponents.forEach((component) => console.log(`- ${component}`));
}
