import { validComponents } from "../scaffold";

export function getListComponents() {
  console.log("Available components:");
  validComponents.forEach((component) => console.log(`- ${component}`));
}
