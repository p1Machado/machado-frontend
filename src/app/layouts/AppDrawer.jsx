import React from "react";
import clsx from "clsx";

import { UserProfile } from "app/features/profile";

import { Drawer, Divider, useTheme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

import { CSSTransition } from "react-transition-group";
import { useMobileMediaQuery } from "app/hooks";

export function AppDrawer({ open, onClose, children }) {
  const isMobile = useMobileMediaQuery();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <CSSTransition
      in={open}
      timeout={open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen}
    >
      <Drawer
        open={open}
        onClose={onClose}
        variant={isMobile ? "temporary" : "permanent"}
        className={
          isMobile
            ? classes.mobileDrawer
            : clsx(classes.drawer, {
                [classes.drawerOpen]: !isMobile && open,
                [classes.drawerClose]: !isMobile && !open,
              })
        }
        classes={{
          paper: isMobile
            ? classes.mobileDrawer
            : clsx({
                [classes.drawerOpen]: !isMobile && open,
                [classes.drawerClose]: !isMobile && !open,
              }),
        }}
      >
        <UserProfile />
        <Divider />
        {children}
      </Drawer>
    </CSSTransition>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    mobileDrawer: {
      width: "75vw",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      "&.enter-active": {
        overflowX: "hidden",
      },
      overflowX: "inherit",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(8) + 1,
    },
    listItem: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
    listItemIcon: {
      minWidth: theme.spacing(5.5),
    },
  }),
);

// import React from "react";

// import { Box, Drawer, Divider, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";

// function AppDrawer({ open, onClose, children }) {
//   const classes = useStyles();
//   return (
//     <Drawer
//       open={open}
//       onClose={onClose}
//       anchor="left"
//       className={classes.drawer}
//       classes={{
//         paper: classes.drawerPaper,
//       }}
//     >
//       <Box px={2} pt={1} pb={2}>
//         <Typography variant="subtitle2">Alana da Silva Corrêa</Typography>
//         <Typography variant="body2" color="textSecondary">
//           alanaacorrea@gmail.com
//         </Typography>
//       </Box>
//       <Divider />
//       {children}
//     </Drawer>
//   );
// }

// const useStyles = makeStyles({
//   drawerPaper: {
//     width: "75vw",
//   },
// });
