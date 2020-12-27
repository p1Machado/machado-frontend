import React from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";

export const MobileMediaQueryContext = React.createContext();

export function MobileMediaQueryProvider({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return <MobileMediaQueryContext.Provider value={isMobile}>{children}</MobileMediaQueryContext.Provider>;
}
