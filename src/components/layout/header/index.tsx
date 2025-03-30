import { Logo } from "@/components/ui/logo";
import React from "react";
import Container from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import UserDropdown from "./user-dropdown";
import SearchDialog from "./search-dialog";
import { cn } from "@/lib/utils/shadcn-utils";
import { getUserData } from "@/lib/cookies/server";

const Header = async ({ showSearch = true }) => {
  // This has to be awaited regardless of what ts is saying
  // There might be an issue with how the types have been setup
  // Unsure of where the problem lies
  const user = await getUserData();
  const isAuthenticated = !!user;

  return (
    <header
      className={cn("relative border-b border-neutral-200 py-16", showSearch && "max-lg:mb-40")}
    >
      <Container
        className={cn(
          "grid min-h-40 grid-cols-2 flex-wrap items-center justify-between gap-16",
          showSearch ? "lg:grid-cols-4" : ""
        )}
      >
        <Logo className="w-[5rem] sm:w-[7rem]" />
        {showSearch && (
          <SearchDialog className="max-lg:absolute max-lg:inset-x-16 max-lg:top-full max-lg:-mt-4 lg:col-span-2 lg:w-[30rem] lg:justify-self-center" />
        )}
        {!isAuthenticated && (
          <div className="flex items-center gap-8 justify-self-end sm:gap-16">
            <Link variant="link" className="p-0 font-normal" href="/register">
              Register
            </Link>
            <div className="h-24 w-[2px] bg-accent"></div>
            <Link variant="link" className="p-0" href="/login">
              Log in
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div className="justify-self-end">
            <UserDropdown
              name={user.name}
              avatar={{ url: user.avatar.url, alt: user.avatar.alt }}
            />
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
