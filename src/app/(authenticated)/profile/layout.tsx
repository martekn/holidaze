import MainSiteLayout from "@/components/layout/main-site-layout";
import ProfileLayout from "@/components/layout/profile-layout";
import DynamicMobileProfileNavSpacer from "@/components/layout/profile-layout/dynamic-mobile-profile-nav-spacer";

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MainSiteLayout>
        <ProfileLayout>{children}</ProfileLayout>
      </MainSiteLayout>
      <DynamicMobileProfileNavSpacer />
    </>
  );
};

export default Layout;
