import type { Metadata } from "next";
import MainSiteLayout from "@/components/layout/main-site-layout";

export const metadata: Metadata = {
  title: "Holidaze | Discover Unique Accommodations",
  description:
    "Welcome to Holidaze! Explore and book unique accommodations for your next getaway. Find the perfect stay for your vacation."
};
const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainSiteLayout showHeaderSearch={false}>{children}</MainSiteLayout>;
};

export default Layout;
