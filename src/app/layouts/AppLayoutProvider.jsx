import React, { useMemo } from "react";

import { LocalizationProvider } from "@material-ui/pickers";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import "moment/locale/pt-br";

import { CssBaseline, createMuiTheme, makeStyles, useMediaQuery } from "@material-ui/core";
import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import "typeface-roboto";

import { MobileMediaQueryProvider } from "app/layouts";

moment.locale("pt-br");

const jss = create({
  plugins: jssPreset().plugins,
});

export function AppLayoutProvider({ colorScheme, children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colorScheme ? colorScheme : prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#496456",
          },
          secondary: {
            main: "#7b8468",
          },
          error: {
            main: "#f76c3b",
          },
        },
        typography: {
          button: {
            textTransform: "none",
          },
        },
        mixins: {
          toolbar: {
            minHeight: 72,
          },
        },
        shape: {
          borderRadius: 2,
        },
        props: {
          MuiDialog: {
            maxWidth: "xs",
            fullWidth: true,
          },
          MuiFormControl: {
            margin: "dense",
            variant: "outlined",
            fullWidth: true,
          },
          MuiTextField: {
            margin: "dense",
            variant: "outlined",
            autoComplete: "off",
            fullWidth: true,
          },
          MuiButton: {
            color: "primary",
          },
          MuiFab: {
            color: "primary",
          },
        },
      }),
    [colorScheme, prefersDarkMode],
  );

  useStyles();

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter} locale={"pt-br"}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MobileMediaQueryProvider>{children}</MobileMediaQueryProvider>
        </ThemeProvider>
      </StylesProvider>
    </LocalizationProvider>
  );
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  "@global": {
    // Firefox
    "input[type=number]": {
      "-moz-appearance": "textfield",
    },
    // Chrome, Safari, Edge, Opera
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
      margin: 0,
      "-webkit-appearance": "none",
    },
    [breakpoints.up("sm")]: {
      // width
      "::-webkit-scrollbar": {
        width: spacing(1),
      },
      // Track
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      // Handle
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      // Handle on hover
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  },
}));
