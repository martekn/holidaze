import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/shadcn-utils";
import { TablerIcon } from "@tabler/icons-react";
import React from "react";

type IconTitleCardProps = {
  title: string;
  icon: TablerIcon;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "lg";
};
const CardIconTitle = ({
  title,
  icon: Icon,
  children,
  className,
  size = "lg",
  ...props
}: IconTitleCardProps) => {
  return (
    <Card variant={"outline"} padding={"lg"} className={cn("space-y-8", className)} {...props}>
      <div className="flex items-center justify-between gap-16">
        <CardTitle variant={size === "lg" ? "heading5" : "heading6"}>{title}</CardTitle>{" "}
        <Icon className={cn("stroke-[1.5]", size === "lg" ? "w-3 h-32" : "h-20 w-20")} />
      </div>
      <div className="text-muted-foreground">{children}</div>
    </Card>
  );
};

export default CardIconTitle;
