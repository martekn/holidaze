import type { Metadata } from "next";
import FormLayout from "@/components/layout/form-layout";

export const metadata: Metadata = {
  title: "Book Your Stay | Holidaze",
  description: "Secure your perfect getaway. Check availability and book your stay today."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
