import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils/shadcn-utils";
import React from "react";

type FooterListProps = { className: string; children: React.ReactNode; heading: string };

const FooterList = ({ children, heading, className }: FooterListProps) => {
  return (
    <section className="space-y-12">
      <Heading tag="h3" variant={"heading5"} className={cn("text-neutral-100", className)}>
        {heading}
      </Heading>
      <ul className="space-y-8">{children}</ul>
    </section>
  );
};

export default FooterList;
