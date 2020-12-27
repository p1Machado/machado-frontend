import React from "react";
import { Typography, Chip } from "@material-ui/core";

export function LTreeChip({ label, size = "small", style, ...rest }) {
  return (
    <Chip
      size={size}
      style={{ ...style, borderRadius: 4, fontWeight: 500 }}
      label={<Typography variant="overline">{label}</Typography>}
      {...rest}
    />
  );
}
