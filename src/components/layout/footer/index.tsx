import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import React from "react";
import FooterList from "./footer-list";
import Container from "@/components/ui/container";
import { FOOTER_QUICK_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-700 text-neutral-200">
      <Container className="flex flex-col gap-40 py-64 md:py-96 lg:flex-row lg:gap-128">
        <div className="max-w-prose space-y-12">
          <h2>
            <Logo variant="dark" className="max-w-[6.5rem]" />
          </h2>
          <p className="leading-7">
            {`At Holidaze, we’re passionate about helping you find the perfect stay for every
            adventure. From cozy cabins to beachfront villas, we connect you with unique homes and
            unforgettable experiences around the world.`}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-40 sm:flex-row sm:gap-128">
          <FooterList heading="Quick links" className="flex-shrink-0">
            {FOOTER_QUICK_LINKS.map(({ text, href }, index) => (
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
      <div className="border-t border-t-neutral-600 py-24">
        <Container>
          <div className="text-sm text-neutral-300">© 2025 Martekn. All rights reserved.</div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
