import * as React from "react";
import NextLink, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils/shadcn-utils";
import { ButtonStyleProps, buttonStyles } from "@/lib/styles";

type ButtonLinkProps = LinkProps &
  ButtonStyleProps & {
    className?: string;
    children: React.ReactNode;
  };

const Link = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <NextLink className={cn(buttonStyles({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

export { Link };
