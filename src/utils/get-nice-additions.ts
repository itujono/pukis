import { type ComponentName, niceAdditionsToAComponent } from "./get-list-components";

// At the moment, this is for form-based components only (input, select, checkbox, etc).

export function getNiceAdditions(component: ComponentName): ComponentName[] {
  if (!niceAdditionsToAComponent[component] || !Array.isArray(niceAdditionsToAComponent[component])) {
    return [];
  }

  return niceAdditionsToAComponent[component] as ComponentName[];
}
