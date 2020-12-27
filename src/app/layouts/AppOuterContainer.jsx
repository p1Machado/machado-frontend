import React from "react";

import { Box } from "@material-ui/core";

export function AppOuterContainer({ children }) {
  return (
    <Box id="app-outer-container" display="flex" flexDirection="column" flexGrow={1}>
      {children}
    </Box>
  );
}
