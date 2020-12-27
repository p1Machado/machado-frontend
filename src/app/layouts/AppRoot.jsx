import React from "react";
import { Box } from "@material-ui/core";

export function AppRoot({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100vw"
      maxWidth="100vw"
      maxHeight="100vh"
      height="100vh"
      overflow="hidden"
    >
      {children}
    </Box>
  );
}
