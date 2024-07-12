import { ComponentName } from "../scaffold";
import { ButtonTemplate } from "./Button";
import { CardTemplate } from "./Card";
import { LabelTemplate } from "./Label";
import { InputTemplate } from "./Input";
import { DrawerTemplate } from "./Drawer";
import { AlertTemplate } from "./Alert";
import { BadgeTemplate } from "./Badge";
import { CheckboxTemplate } from "./Checkbox";
import { DialogTemplate } from "./Dialog";
import { DropdownMenuTemplate } from "./DropdownMenu";
import { InputOTPTemplate } from "./InputOTP";

export const componentTemplates: { [key in ComponentName]: string } = {
  Button: ButtonTemplate,
  Label: LabelTemplate,
  Card: CardTemplate,
  Input: InputTemplate,
  Alert: AlertTemplate,
  Badge: BadgeTemplate,
  Checkbox: CheckboxTemplate,
  Dialog: DialogTemplate,
  Drawer: DrawerTemplate,
  DropdownMenu: DropdownMenuTemplate,
  InputOTP: InputOTPTemplate,
};
