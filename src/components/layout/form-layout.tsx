import React from "react";
import { Logo } from "../ui/logo";
import Container from "../ui/container";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen space-y-64 pb-64 md:pb-128">
      <Container variant={"fullBleed"}>
        <header className="pt-16">
          <Logo className="w-96" />
        </header>
      </Container>
      <main>{children}</main>
    </div>
  );
};

export default FormLayout;
