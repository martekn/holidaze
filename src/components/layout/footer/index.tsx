import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import React from "react";
import FooterList from "./footer-list";
import Container from "@/components/ui/container";

const Footer = () => {
  const quickLinks = [
    { text: "Explore stays", href: "/explore" },
    { text: "Become a host", href: "/become-a-host" },
    { text: "Create account", href: "/register" },
    { text: "Log in", href: "/login" }
  ];

  return (
    <footer className="bg-neutral-700 text-neutral-200">
      <Container className="mx-auto flex max-w-screen-xl flex-col gap-40 py-64 md:py-96 lg:flex-row lg:gap-128">
        <div className="max-w-prose space-y-12">
          <h2>
            <Logo variant="dark" logoClassName="w-[6.5rem] py-4" />
          </h2>
          <p className="leading-7">
            {`At Holidaze, we’re passionate about helping you find the perfect stay for every
            adventure. From cozy cabins to beachfront villas, we connect you with unique homes and
            unforgettable experiences around the world.`}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-40 sm:flex-row sm:gap-128">
          <FooterList heading="Quick links" className="flex-shrink-0">
            {quickLinks.map(({ text, href }, index) => (
              <li key={index}>
                <Link
                  variant={"linkInverted"}
                  className="h-auto p-0 font-base font-normal text-neutral-200"
                  href={href}
                >
                  {text}
                </Link>
              </li>
            ))}
          </FooterList>
          <FooterList heading="Support" className="flex-shrink-0">
            <li>Email: support@holidaze.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </FooterList>
        </div>
      </Container>
      <div className="border-t border-t-neutral-600 py-24 text-sm text-neutral-300">
        <Container className="mx-auto max-w-screen-xl">
          © 2025 Martekn. All rights reserved.
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
