import React from "react";
import clsx from "clsx";
import { Avatar as MuiAvatar, makeStyles } from "@material-ui/core";

export function Avatar({ size, children, className, ...props }) {
  const classes = useStyles();
  return (
    <MuiAvatar className={clsx(classes[size], className)} {...props}>
      {children}
    </MuiAvatar>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  small: {
    width: spacing(3),
    height: spacing(3),
  },
  large: {
    width: spacing(7),
    height: spacing(7),
  },
}));
