"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type DropdownMenuLinkItemProps = {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
};
const DropdownMenuLinkItem = ({
  icon: icon,
  href,
  children,
  ...props
}: DropdownMenuLinkItemProps) => {
  const currentPage = usePathname();
  const isActive = currentPage === href;

  return (
    <DropdownMenuItem asChild {...props}>
      <NextLink
        className={cn(
          isActive ? "bg-secondary-100 hover:bg-secondary-100" : "hover:bg-neutral-200"
        )}
        href={href}
      >
        <Slot className="h-16 w-16">{icon}</Slot>
        <span>{children}</span>
        {isActive && <span className="ml-auto h-4 w-4 rounded-full bg-neutral-700" />}
      </NextLink>
    </DropdownMenuItem>
  );
};

export default DropdownMenuLinkItem;
