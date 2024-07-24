export const validComponents = [
  "button",
  "label",
  "card",
  "input",
  "alert",
  "badge",
  "checkbox",
  "dialog",
  "alert-dialog",
  "drawer",
  "dropdown-menu",
  "input-otp",
  "form",
  "menubar",
  "form-input",
  "tabs",
  "popover",
  "calendar",
  "switch",
  "form-switch",
  "datepicker",
] as const;

export type ComponentName = (typeof validComponents)[number];

export function getListComponents() {
  console.log("Available components:");
  validComponents.forEach((component) => console.log(`- ${component}`));
}

export const niceAdditionsToAComponent: Partial<Record<ComponentName, ComponentName[]>> = {
  input: ["form-input"],
};

export const componentDependencies: Partial<Record<ComponentName, ComponentName[]>> = {
  "form-input": ["form"],
  datepicker: ["popover", "calendar"],
  "form-switch": ["form"],
  form: ["label"],
};
