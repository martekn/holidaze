import type { Metadata } from "next";
import AuthLayout from "@/components/layout/auth-layout";

export const metadata: Metadata = {
  title: "Login | Holidaze",
  description:
    "Login to your Holidaze account to manage your bookings and explore unique accommodations."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
