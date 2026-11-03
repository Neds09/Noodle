import * as React from "react";
import { cn } from "@/lib/utils";

/** Paprastas (natyvus) select, stilizuotas kaip shadcn/ui. */
const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
export { Select };
