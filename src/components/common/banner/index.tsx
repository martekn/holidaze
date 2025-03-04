import { Card } from "@/components/ui/card";
import { Heading, HeadingProps } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import React from "react";

type BannerProps = {
  headingOptions?: HeadingProps;
  children?: React.ReactNode;
  title: string;
  body: string;
  type?: "highlight" | "minimal";
};

const Banner = ({ type = "highlight", title, headingOptions, body, children }: BannerProps) => {
  const isHighlight = type === "highlight";
  const defaultHeadingVariant = isHighlight ? "heading2" : "heading4";

  return (
    <Card
      padding={isHighlight ? "default" : "lg"}
      variant={isHighlight ? "default" : "outline"}
      className={cn(
        "grid justify-center gap-40 md:p-64",
        isHighlight && "bg-secondary-100 p-64 md:p-128"
      )}
    >
      <div className={cn("max-w-prose text-center", isHighlight ? "space-y-16" : "space-y-8")}>
        <Heading
          tag={headingOptions?.tag ?? "h2"}
          variant={headingOptions?.variant ?? defaultHeadingVariant}
        >
          {title}
        </Heading>
        <p className="leading-7 text-muted-foreground">{body}</p>
      </div>
      {children && <div className="mx-auto">{children}</div>}
    </Card>
  );
};

export default Banner;
