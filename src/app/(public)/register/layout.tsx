import type { Metadata } from "next";
import AuthLayout from "@/components/layout/auth-layout";

export const metadata: Metadata = {
  title: "Register | Holidaze",
  description:
    "Create a new Holidaze account to start booking unique accommodations and manage your travel plans."
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
