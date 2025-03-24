import type { Metadata } from "next";
import MainSiteLayout from "@/components/layout/main-site-layout";

export const metadata: Metadata = {
  title: "Become a Host | Holidaze",
  description:
    "List your property on Holidaze and join our community of hosts. Share your unique space with travelers and start earning today. Simple registration process with full control over your listings."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainSiteLayout>{children}</MainSiteLayout>;
};

export default Layout;
