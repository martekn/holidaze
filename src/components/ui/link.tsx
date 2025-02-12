import * as React from "react";
import NextLink, { type LinkProps } from "next/link";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = LinkProps &
  Pick<ButtonProps, "variant" | "size"> & {
    className?: string;
    children: React.ReactNode;
  };

const Link = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <NextLink className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

export { Link };
