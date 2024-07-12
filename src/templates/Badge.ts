export const BadgeTemplate = `
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        destructive: "bg-danger text-white",
        outline: "text-primary border border-secondary",
        success: "bg-success text-white",
        warning: "bg-warning text-primary",
        info: "bg-info text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
`;
