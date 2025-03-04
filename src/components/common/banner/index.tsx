import { Card } from "@/components/ui/card";
import { Heading, HeadingProps } from "@/components/ui/heading";
import { sectionStyles, SectionStylesProps } from "@/lib/styles/section-styles";
import { cn } from "@/lib/utils";
import React from "react";

type BannerProps = {
  headingOptions?: HeadingProps;
  children?: React.ReactNode;
  title: string;
  body: string;
  type?: "highlight" | "minimal";
  isSection?: boolean;
  sectionInnerSpacing?: SectionStylesProps["innerSpacing"];
};

const Banner = ({
  type = "highlight",
  title,
  sectionInnerSpacing = "sm",
  headingOptions,
  body,
  isSection,
  children
}: BannerProps) => {
  const isHighlight = type === "highlight";
  const defaultHeadingVariant = isHighlight ? "heading2" : "heading4";

  return (
    <Card
      padding={"lg"}
      variant={isHighlight ? "default" : "outline"}
      className={cn(
        "grid justify-center gap-40 px-16 md:px-64",
        isHighlight && "bg-secondary-100",
        isSection &&
          sectionStyles({
            variant: "disabled",
            innerSpacing: sectionInnerSpacing
          })
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
