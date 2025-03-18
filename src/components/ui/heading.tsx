import { HeadingStyleProps, headingStyles } from "@/lib/styles/heading-styles";
import { cn } from "@/lib/utils/shadcn-utils";
import * as React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, HeadingStyleProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = ({ tag: Tag = "h1", variant, className, ...props }: HeadingProps) => {
  return <Tag className={cn(headingStyles({ variant, className }))} {...props} />;
};

export { Heading, type HeadingProps };
