import { sectionStyles, SectionStylesProps } from "@/lib/styles/section-styles";
import { cn } from "@/lib/utils/shadcn-utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type SectionProps = SectionStylesProps & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

const Section = ({
  variant,
  innerSpacing,
  children,
  className,
  asChild,
  ...props
}: SectionProps) => {
  const Comp = asChild ? Slot : "section";

  return (
    <Comp className={cn(sectionStyles({ variant, innerSpacing }), className)} {...props}>
      {children}
    </Comp>
  );
};

export default Section;
