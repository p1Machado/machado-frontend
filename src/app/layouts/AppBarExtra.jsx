import React from "react";
import { Portal } from "@material-ui/core";
import { appBarExtraRef } from "app/layouts/AppBar";

export function AppBarExtra({ children }) {
  return !!appBarExtraRef.current && <Portal container={appBarExtraRef.current}>{children}</Portal>;
}
