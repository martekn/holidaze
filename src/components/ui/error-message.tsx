import { cn } from "@/lib/utils/shadcn-utils";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import React from "react";

const ErrorMessage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span {...props} ref={ref} className={cn("flex gap-4 text-alert-error", className)}>
        <IconExclamationCircleFilled className="mt-2 h-20 w-20 shrink-0" />
        <p>{children}</p>
      </span>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
