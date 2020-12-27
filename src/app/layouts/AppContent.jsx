import { Fade, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

export function AppContent({ loading, disablePadding, children, fluid, backButtonMargin }) {
  const classes = useStyles();
  return (
    <Fade in={!loading ?? true} className={clsx(classes.content, { disablePadding, fluid, backButtonMargin })}>
      <div>{children}</div>
    </Fade>
  );
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  content: {
    height: "100%",
    overflow: "auto",
    padding: spacing(1),
    maxWidth: breakpoints.values.lg,
    marginLeft: "auto",
    marginRight: "auto",
    "&.disablePadding": {
      padding: 0,
    },
    "&.fluid": {
      maxWidth: breakpoints.values.xl,
    },
    "&.backButtonMargin": {
      [breakpoints.down("xs")]: {
        marginLeft: spacing(6.5),
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
}));
