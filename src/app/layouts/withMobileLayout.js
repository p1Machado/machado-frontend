import React from "react";
import { useMobileMediaQuery } from "app/hooks";

export function withMobileLayout(MobileLayout, DesktopLayout) {
  function MobileLayoutHandler(props) {
    const isMobile = useMobileMediaQuery();
    return isMobile ? <MobileLayout {...props} /> : <DesktopLayout {...props} />;
  }
  return MobileLayoutHandler;
}
