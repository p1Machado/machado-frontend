import React from "react";
import clsx from "clsx";
import { Chip, makeStyles } from "@material-ui/core";

export function ColoredChip({ color, className, ...rest }) {
  const classes = useStyles();
  return <Chip className={clsx(className, classes.colored, color)} color={handleColor(color)} {...rest} />;
}

const useStyles = makeStyles(({ palette }) => ({
  colored: {
    "&.success": coloredStyle(palette.success),
    "&.info": coloredStyle(palette.info),
    "&.error": coloredStyle(palette.error),
    "&.warning": coloredStyle(palette.warning),
    "&.MuiChip-outlined": {
      backgroundColor: "transparent",
    },
  },
}));

function coloredStyle(color) {
  return {
    "&:not(.MuiChip-outlined)": {
      backgroundColor: color.main,
    },
    "&.MuiChip-outlined": {
      color: color.main,
      borderColor: color.main,
    },
  };
}

function handleColor(color) {
  if (color === "primary" || color === "secondary") {
    return color;
  }
}
