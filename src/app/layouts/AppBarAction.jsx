import React from "react";
import { Portal } from "@material-ui/core";
import { appBarActionRef } from "app/layouts/AppBar";

export function AppBarAction({ children }) {
  return !!appBarActionRef.current && <Portal container={appBarActionRef.current}>{children}</Portal>;
}
