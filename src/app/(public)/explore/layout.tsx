import MainSiteLayout from "@/components/layout/main-site-layout";

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainSiteLayout>{children}</MainSiteLayout>;
};

export default Layout;
