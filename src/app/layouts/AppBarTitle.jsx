import React from "react";
import { Box, Typography, Portal } from "@material-ui/core";
import { appBarTitleRef } from "app/layouts/AppBar";

export function AppBarTitle({ children }) {
  return (
    !!appBarTitleRef.current && (
      <Portal container={appBarTitleRef.current}>
        <Box style={{ maxWidth: "100%" }}>{renderChildren(children)}</Box>
      </Portal>
    )
  );
}

function renderChildren(children) {
  switch (typeof children) {
    case "string":
      return (
        <Typography variant="h6" style={{ lineHeight: 1.5 }}>
          {children}
        </Typography>
      );
    case "function":
      return children();
    default:
      return children;
  }
}
