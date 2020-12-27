import React, { useCallback, useReducer } from "react";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";

import { Alert } from "@material-ui/lab";
import { Box, Snackbar, useTheme, makeStyles } from "@material-ui/core";

const dispatchRef = React.createRef();

const alertsAdapter = createEntityAdapter({
  selectId({ key }) {
    return key;
  },
});

const initialState = alertsAdapter.getInitialState();

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addedAlert: alertsAdapter.addOne,
    removedAlert: alertsAdapter.removeOne,
  },
});

const { addedAlert, removedAlert } = alertSlice.actions;

const { selectAll } = alertsAdapter.getSelectors();

export function AppAlert() {
  const classes = useStyles();
  const { spacing, zIndex } = useTheme();

  const [state, dispatch] = useReducer(alertSlice.reducer, initialState);
  dispatchRef.current = dispatch;

  const alerts = selectAll(state);

  const handleClose = useCallback(
    (_event, reason, key) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(removedAlert(key));
    },
    [dispatch],
  );

  return (
    <Box
      id="app-alert-container"
      display="grid"
      gridAutoFlow="row"
      gridRowGap={spacing(2)}
      position="fixed"
      bottom={spacing(3)}
      left={0}
      right={0}
      zIndex={zIndex.snackbar}
    >
      {alerts?.map(({ key, message, severity }) => (
        <Snackbar
          key={key}
          open
          autoHideDuration={6000}
          onClose={(event, reason) => handleClose(event, reason, key)}
          className={classes.snackbar}
        >
          <Alert severity={severity} onClose={(event, reason) => handleClose(event, reason, key)} elevation={6}>
            {message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}

const useStyles = makeStyles({
  snackbar: {
    position: "relative",
    top: "unset",
    right: "unset",
    bottom: "unset",
    left: "unset",
    transform: "unset",
  },
});

export function dispatchAlert(message, severity) {
  if (!dispatchRef.current) {
    window.alert(message);
    return;
  }
  dispatchRef.current(addedAlert({ key: uniqueId(), message, severity }));
}
