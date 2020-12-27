import React, { forwardRef } from "react";

import { Button, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useMobileMediaQuery } from "app/hooks";

export const ActionButton = forwardRef(({ color, children, startIcon, endIcon, ...rest }, ref) => {
  const isMobile = useMobileMediaQuery();
  const classes = useStyles();
  return isMobile ? (
    <Fab color={color} className={classes.fab} {...rest} variant="round">
      {startIcon || endIcon}
    </Fab>
  ) : (
    <Button startIcon={startIcon} endIcon={endIcon} color={color} ref={ref} {...rest} variant="contained">
      {children}
    </Button>
  );
});

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
