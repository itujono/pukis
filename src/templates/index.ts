import type { ComponentName } from "../utils/get-list-components";
import { ButtonTemplate } from "./Button";
import { CardTemplate } from "./Card";
import { LabelTemplate } from "./Label";
import { FormInputTemplate, InputTemplate } from "./Input";
import { DrawerTemplate } from "./Drawer";
import { AlertTemplate } from "./Alert";
import { BadgeTemplate } from "./Badge";
import { CheckboxTemplate } from "./Checkbox";
import { DialogTemplate } from "./Dialog";
import { DropdownMenuTemplate } from "./DropdownMenu";
import { InputOTPTemplate } from "./InputOTP";
import { FormTemplate } from "./Form";
import { MenuBarTemplate } from "./MenuBar";
import { TabsTemplate } from "./Tabs";
import { PopoverTemplate } from "./Popover";
import { CalendarTemplate } from "./Calendar";
import { FormSwitchTemplate, SwitchTemplate } from "./Switch";
import { AlertDialogTemplate } from "./AlertDialog";
import { DatepickerTemplate } from "./Datepicker";

export const componentTemplates: { [key in ComponentName]: string } = {
  button: ButtonTemplate,
  label: LabelTemplate,
  card: CardTemplate,
  input: InputTemplate,
  "input-otp": InputOTPTemplate,
  alert: AlertTemplate,
  "alert-dialog": AlertDialogTemplate,
  badge: BadgeTemplate,
  checkbox: CheckboxTemplate,
  dialog: DialogTemplate,
  drawer: DrawerTemplate,
  "dropdown-menu": DropdownMenuTemplate,
  form: FormTemplate,
  menubar: MenuBarTemplate,
  "form-input": FormInputTemplate,
  tabs: TabsTemplate,
  popover: PopoverTemplate,
  calendar: CalendarTemplate,
  switch: SwitchTemplate,
  datepicker: DatepickerTemplate,
  "form-switch": FormSwitchTemplate,
};
