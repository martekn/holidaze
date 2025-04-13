import type { Metadata } from "next";
import FormLayout from "@/components/layout/form-layout";

export const metadata: Metadata = {
  title: "Manage Your Listing | Holidaze",
  description:
    "List or update your property on Holidaze. Set your availability, pricing, and rules to start earning from bookings."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
