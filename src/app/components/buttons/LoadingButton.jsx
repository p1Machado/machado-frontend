import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

export function LoadingButton({ children, loading = false, ...rest }) {
  const classes = useStyles();
  return (
    <div style={{ position: "relative" }}>
      <Button disabled={loading} {...rest}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  progress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
