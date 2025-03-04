import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  variant?: "full-bleed" | "2xl" | "xl" | "lg" | "md" | "sm";
  className?: string;
  asChild?: boolean;
};
const Container = ({ variant = "xl", children, className, asChild, ...props }: ContainerProps) => {
  const isFullBleed = variant === "full-bleed";
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn("px-16", isFullBleed ? "w-full" : `mx-auto max-w-screen-${variant}`, className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Container;
