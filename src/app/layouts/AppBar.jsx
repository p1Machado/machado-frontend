import React from "react";

import { AppBar as MuiAppBar, Box, Toolbar, IconButton, useTheme } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";

import { LinkButton } from "app/components";
// import { AppBreadcrumbs } from "app/layouts";
import { useRouteMatch } from "react-router-dom";
import { useMobileMediaQuery } from "app/hooks";

export const appBarActionRef = React.createRef();
export const appBarLoadingRef = React.createRef();
export const appBarTitleRef = React.createRef();
export const appBarExtraRef = React.createRef();

export function AppBar({ onClick }) {
  const { spacing } = useTheme();
  const isMobile = useMobileMediaQuery();
  const matchItemProjetoPage = useRouteMatch("/projetos/:projetoId/itens-projeto/:itemId");
  const matchOrcamentoPage = useRouteMatch("/projetos/:projetoId/orcamentos/:orcamentoId");
  return (
    <MuiAppBar position="relative" color={isMobile ? "inherit" : "transparent"} elevation={0}>
      <Box id="app-bar-loading" position="absolute" top={0} left={0} right={0} ref={appBarLoadingRef} />
      {/* {!isMobile && (
        <Box px={3} py={1} pb={0}>
          <AppBreadcrumbs />
        </Box>
      )} */}
      <Toolbar style={{ maxWidth: "100vw", alignItems: "start" }}>
        <Box pt={1.5} alignSelf="flex-start">
          {isMobile &&
            (matchItemProjetoPage ? (
              <IconButton
                to={"/projetos/" + matchItemProjetoPage.params.projetoId + "/itens-projeto"}
                component={LinkButton}
                edge="start"
                color="inherit"
              >
                <ArrowBackIcon />
              </IconButton>
            ) : matchOrcamentoPage ? (
              <IconButton
                to={"/projetos/" + matchOrcamentoPage.params.projetoId + "/orcamentos"}
                component={LinkButton}
                edge="start"
                color="inherit"
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <IconButton onClick={onClick} edge="start" color="inherit">
                <MenuIcon />
              </IconButton>
            ))}
        </Box>
        <Box id="app-bar-title" pt={1.5} maxWidth="100%" ref={appBarTitleRef} />
        <Box id="app-bar-spacer" flex={1} />
        <Box
          id="app-bar-actions"
          display="grid"
          gridAutoFlow="column"
          gridColumnGap={spacing(1)}
          ref={appBarActionRef}
        />
      </Toolbar>
      <Box id="app-bar-extra" overflow="hidden" maxWidth="100%" ref={appBarExtraRef} />
    </MuiAppBar>
  );
}
