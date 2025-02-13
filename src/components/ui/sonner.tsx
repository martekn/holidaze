"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { Alert, AlertProps } from "./alert";
import { IconX } from "@tabler/icons-react";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast: "w-full"
        }
      }}
      {...props}
    />
  );
};
interface ToastOptions extends Omit<AlertProps, "ref"> {
  duration?: number;
}

const toast = (options: ToastOptions) => {
  const { title, children, duration, ...alertProps } = options;

  sonnerToast.custom(
    (t) => (
      <Alert title={title} {...alertProps} className="relative">
        <div>
          <div>{children}</div>

          <button
            className="absolute -right-8 -top-8 rounded-full border bg-background p-4"
            onClick={() => sonnerToast.dismiss(t)}
          >
            <IconX className="h-16 w-16 stroke-2" />
          </button>
        </div>
      </Alert>
    ),
    {
      duration: duration
    }
  );
};

export { Toaster, toast };
