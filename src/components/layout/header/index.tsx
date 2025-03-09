import { Logo } from "@/components/ui/logo";
import React from "react";
import Container from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import UserDropdown from "./user-dropdown";
import SearchDialog from "./search-dialog";

const Header = ({ showSearch = true }) => {
  // Temporary variable until authentication is added and the component is updated
  // Will also need to update the dropdown avatar prop when auth is in place
  const isAuthenticated = true;

  return (
    <header className="relative border-b border-neutral-200 py-16 max-lg:mb-40">
      <Container className="grid min-h-40 grid-cols-2 flex-wrap items-center justify-between gap-16 lg:grid-cols-4">
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
            {/* Avatar not added */}
            <UserDropdown name="username" avatar={{ alt: "", url: "" }} />
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
