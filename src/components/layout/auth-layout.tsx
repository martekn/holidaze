import React from "react";
import { Logo } from "../ui/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-secondary-100">
      <div className="grid min-h-screen grid-rows-[auto,_1fr] bg-neutral-100 p-24 shadow-md xl:max-w-screen-lg">
        <header>
          <Logo className="w-96" />
        </header>
        <main className="mx-auto w-full max-w-md self-center pb-96 pt-32">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
