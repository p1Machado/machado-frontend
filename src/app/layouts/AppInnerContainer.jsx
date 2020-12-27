import React from "react";
import { makeStyles } from "@material-ui/core";

export function AppInnerContainer({ children }) {
  const classes = useStyles();
  return (
    <div id="app-inner-container" className={classes.outer}>
      <div className={classes.inner}>{children}</div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  outer: {
    // ...toolbarMixin(theme.mixins.toolbar),
    flexGrow: 1,
    position: "relative",
    overflow: "auto",
    zIndex: theme.zIndex.appBar - 1,
  },
  inner: {
    [theme.breakpoints.down("xs")]: {
      // FAB
      marginBottom: `calc(52px + ${theme.spacing(4)}px)`,
    },
  },
}));

// function toolbarMixin({ minHeight, ...rest }) {
//   const medias = Object.keys(rest);
//   const mixins = medias.reduce((acc, media) => {
//     acc[media] = {
//       height: `calc(100vh - ${rest[media].minHeight}px)`,
//     };
//     return acc;
//   }, {});
//   return {
//     height: `calc(100vh - ${minHeight}px)`,
//     ...mixins,
//   };
// }
