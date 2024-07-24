export const InputTemplate = `
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-slate-400",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
`;

export const FormInputTemplate = `
import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

interface FormInputProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  help?: string;
  parentClassname?: string;
}

function FormInput<T extends FieldValues>({ name, control, label, help, parentClassname, ...props }: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={parentClassname}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {props.type === "number" ? (
              <NumericFormat
                className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                value={field.value}
                onValueChange={(values) => field.onChange(values.value)}
                thousandSeparator="."
                decimalSeparator=","
              />
            ) : (
              <Input {...field} {...props} />
            )}
          </FormControl>
          {help && <FormDescription>{help}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { Input, FormInput };
`;
