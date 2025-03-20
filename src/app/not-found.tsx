import React from "react";
import type { Metadata } from "next";
import MainSiteLayout from "@/components/layout/main-site-layout";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";

export const metadata: Metadata = {
  title: "Page Not Found | Holidaze",
  description:
    "Oops! The page you're looking for doesn't exist. Return to Holidaze to discover unique accommodations for your next getaway."
};

const NotFound = () => {
  return (
    <MainSiteLayout>
      <main className="flex h-full flex-grow flex-col">
        <Container className="flex h-full w-full flex-grow flex-col justify-between">
          <Section className="space-y-48" variant={"lg"}>
            <div className="space-y-24">
              <Heading tag="h1" variant={"heading1"}>
                Oops! This page has checked out
              </Heading>
              <p className="max-w-prose leading-7">
                We couldn’t find the page you’re looking for. It might have been moved, deleted, or
                is taking a little vacation of its own. But don’t worry—we’ve got plenty of amazing
                stays waiting for you!
              </p>
            </div>
            <div className="flex gap-16">
              <Link href="/" variant={"outline"}>
                Return home
              </Link>
              <Link href="/explore">Explore stays</Link>
            </div>
          </Section>
          <span className="py-16 text-sm text-muted-foreground">Error code: 404</span>
        </Container>
      </main>
    </MainSiteLayout>
  );
};

export default NotFound;
