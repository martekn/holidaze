import MainSiteLayout from "@/components/layout/main-site-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Holidaze",
  description:
    "Your reservation is secured! Thank you for choosing Holidaze. We've sent your booking details to your email. Get ready for an unforgettable experience."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainSiteLayout>{children}</MainSiteLayout>;
};

export default Layout;
