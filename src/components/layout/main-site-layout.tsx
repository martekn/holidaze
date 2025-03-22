import React from "react";
import Header from "./header";
import Footer from "./footer";

const MainSiteLayout = ({
  children,
  showHeaderSearch = true
}: {
  children: React.ReactNode;
  showHeaderSearch?: boolean;
}) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header showSearch={showHeaderSearch} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainSiteLayout;
