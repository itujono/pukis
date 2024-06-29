import { ComponentName } from "../scaffold";
import { ButtonTemplate } from "./Button";
import { CardTemplate } from "./Card";
import { LabelTemplate } from "./Label";

export const componentTemplates: { [key in ComponentName]: string } = {
  Button: ButtonTemplate,
  Label: LabelTemplate,
  Card: CardTemplate,
};
