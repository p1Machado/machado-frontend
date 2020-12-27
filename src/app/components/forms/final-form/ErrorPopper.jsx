import React, { useRef } from "react";
import { Box, Fade, Paper, Popper, Typography, makeStyles } from "@material-ui/core";
import { ReportProblem as ReportProblemIcon } from "@material-ui/icons";

export function ErrorPopper({ error, open, anchorEl }) {
  const classes = useStyles();
  const errorText = useRef(error);
  if (error) {
    errorText.current = error;
  }
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom" disablePortal transition style={{ zIndex: 1 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box className={classes.container}>
            <Box className={classes.arrow} />
            <Paper elevation={3} className={classes.paper}>
              <ReportProblemIcon className={classes.icon} />
              <Typography variant="body2">{errorText.current}</Typography>
            </Paper>
          </Box>
        </Fade>
      )}
    </Popper>
  );
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  icon: {
    color: palette.warning.main,
  },
  paper: {
    color: palette.getContrastText(palette.common.white),
    backgroundColor: palette.common.white,
    padding: spacing(1),
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridColumnGap: spacing(1),
    border: "1px solid",
    borderColor: palette.divider,
  },
  arrow: {
    height: 6,
    paddingLeft: spacing(2),
    "&::before": {
      content: "''",
      display: "block",
      width: 8,
      height: 8,
      backgroundColor: palette.common.white,
      borderLeft: "1px solid",
      borderLeftColor: palette.divider,
      borderTop: "1px solid",
      borderTopColor: palette.divider,
      transform: "rotate(45deg) translate(-3px, 5px)",
    },
  },
}));
