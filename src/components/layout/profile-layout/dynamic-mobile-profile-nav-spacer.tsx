"use client";

import { useEffect, useState } from "react";

const DynamicMobileProfileNavSpacer = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const profileElement = document.querySelector("[data-profile-layout]");
      if (profileElement) {
        setHeight(profileElement.clientHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const profileElement = document.querySelector("[data-profile-layout]");
    if (profileElement) {
      resizeObserver.observe(profileElement);
    }

    return () => {
      if (profileElement) {
        resizeObserver.unobserve(profileElement);
      }
    };
  }, []);

  return <div className="lg:hidden" style={{ height: `${height}px` }} />;
};

export default DynamicMobileProfileNavSpacer;
