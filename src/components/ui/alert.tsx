import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/shadcn-utils";
import { Heading } from "./heading";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
  IconInfoSquareFilled
} from "@tabler/icons-react";

const Icons = {
  error: IconExclamationCircleFilled,
  warning: IconAlertTriangleFilled,
  information: IconInfoSquareFilled,
  success: IconCircleCheckFilled
};

const alertVariants = cva(
  "bg-background w-full text-foreground rounded-lg border p-16 flex gap-16",
  {
    variants: {
      variant: {
        default: "",
        error: "border-alert-error [&>svg]:text-alert-error",
        information: "border-alert-information [&>svg]:text-alert-information",
        warning: "border-alert-warning [&>svg]:text-alert-warning",
        success: "border-alert-success [&>svg]:text-alert-success"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ title, className, variant, children, ...props }, ref) => {
    const Icon = variant && variant !== "default" ? Icons[variant] : null;

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {Icon && <Icon className="my-2 h-24 w-24" />}
        <div>
          <Heading tag={"h6"} variant={"heading5"} className="mb-4">
            {title}
          </Heading>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
