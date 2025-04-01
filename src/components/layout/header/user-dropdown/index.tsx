"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import DropdownMenuLinkItem from "./dropdown-menu-link-item";
import { Button } from "@/components/ui/button";
import { TBaseUser } from "@/lib/schema";
import { logoutUser } from "@/lib/api/auth";
import { PROFILE_LINKS } from "@/lib/constants";

const UserDropdown = ({ name, avatar }: Pick<TBaseUser, "name" | "avatar">) => {
  const onLogout = () => {
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"custom"}
          className="group -mx-4 -my-4 flex items-center gap-8 rounded-lg p-4 text-neutral-400 transition-colors hover:bg-transparent hover:text-foreground focus-visible:ring-offset-0 data-[state=open]:text-foreground"
        >
          <IconChevronDown className="h-20 w-20 transition-transform group-data-[state=open]:rotate-180" />
          <span className="sr-only">Profile</span>
          <Avatar className="h-40 w-40" alt={avatar.alt} src={avatar.url} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[16rem] max-w-full" sideOffset={8}>
        <DropdownMenuLabel className="flex items-center gap-12">
          <Avatar className="h-32 w-32" alt={avatar.alt} src={avatar.url} />
          <div className="font-normal">{name}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-8">
          {PROFILE_LINKS.map(({ text, href, icon: Icon }, index) => (
            <DropdownMenuLinkItem key={index} href={href} icon={<Icon />}>
              {text}
            </DropdownMenuLinkItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup onClick={onLogout}>
          <DropdownMenuItem className="text-primary hover:!bg-primary/10 hover:!text-primary">
            <IconLogout />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
