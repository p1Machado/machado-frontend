import React from "react";
import { Fade, Portal } from "@material-ui/core";
import { appBarLoadingRef } from "app/layouts/AppBar";

export function AppBarLoading({ loading, children }) {
  return (
    <Portal container={appBarLoadingRef.current}>
      <Fade in={loading} timeout={800} unmountOnExit>
        {children}
      </Fade>
    </Portal>
  );
}
