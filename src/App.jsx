import React, { useState } from "react";

import { Provider } from "react-redux";
import store from "app/store";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { ClienteListPage } from "app/features/clientes";
import { FornecedorPage, FornecedorListPage } from "app/features/fornecedores";
import { OrcamentoPage, OrcamentoList } from "app/features/orcamentos";
import { ProjetoPage, ProjetoListPage } from "app/features/projetos";
import { ItemProjetoPage } from "app/features/itensProjeto";

import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import {
  AppAlert,
  AppBar,
  AppDrawer,
  AppOuterContainer,
  AppLayoutProvider,
  AppInnerContainer,
  AppRoot,
  AppSecurity,
} from "app/layouts";
import { RouterListItem } from "app/components";
import { useMobileMediaQuery } from "app/hooks";
import {
  ChevronLeft,
  ChevronRight,
  DescriptionOutlined as ProjetosIcon,
  PeopleOutlineOutlined as FornecedoresIcon,
  PersonOutlineOutlined as ClientesIcon,
} from "@material-ui/icons";

export default function App() {
  return (
    <AppLayoutProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppLayoutProvider>
  );
}

function AppRouter() {
  const isMobile = useMobileMediaQuery();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);
  const handleNavigation = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  const classes = useStyles();
  return (
    <BrowserRouter>
      <AppRoot>
        <AppAlert />
        <AppSecurity>
          <AppDrawer open={isDrawerOpen} onClose={handleClose}>
            <List component="nav" style={{ flex: 1 }}>
              <RouterListItem to="/projetos" onClick={handleNavigation} className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <ProjetosIcon />
                </ListItemIcon>
                <ListItemText primary="Projetos" />
              </RouterListItem>
              <RouterListItem to="/fornecedores" onClick={handleNavigation} className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <FornecedoresIcon />
                </ListItemIcon>
                <ListItemText primary="Fornecedores" />
              </RouterListItem>
              <RouterListItem to="/clientes" onClick={handleNavigation} className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <ClientesIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </RouterListItem>
            </List>
            <List>
              <ListItem
                onClick={isDrawerOpen ? handleClose : handleOpen}
                button
                dense
                classes={{ root: classes.listItem }}
              >
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
                </ListItemIcon>
                <ListItemText primary="Recolher" />
              </ListItem>
            </List>
          </AppDrawer>
          <AppOuterContainer>
            <AppBar onClick={handleOpen} />
            <AppInnerContainer>
              <Switch>
                <Redirect from="/" to="/projetos" exact />
                <Route path="/projetos" exact>
                  <ProjetoListPage />
                </Route>

                <Redirect from="/projetos/:projetoId" to="/projetos/:projetoId/itens-projeto" exact />
                <Route
                  path={[
                    "/projetos/:projetoId/itens-projeto",
                    "/projetos/:projetoId/fornecedores",
                    "/projetos/:projetoId/orcamentos",
                  ]}
                  exact
                >
                  <ProjetoPage />
                </Route>

                <Route path="/projetos/:projetoId/itens-projeto/:itemId" exact>
                  <ItemProjetoPage />
                </Route>
                <Route path="/projetos/:projetoId/fornecedores/:fornecedorId" exact>
                  <FornecedorPage />
                </Route>
                <Route path="/projetos/:projetoId/orcamentos/:orcamentoId" exact>
                  <OrcamentoPage />
                </Route>

                <Route path="/clientes" exact>
                  <ClienteListPage />
                </Route>

                <Route path="/orcamentos" exact>
                  <OrcamentoList />
                </Route>

                <Route path="/fornecedores" exact>
                  <FornecedorListPage />
                </Route>
              </Switch>
            </AppInnerContainer>
          </AppOuterContainer>
        </AppSecurity>
      </AppRoot>
    </BrowserRouter>
  );
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  },
  listItemIcon: {
    minWidth: theme.spacing(5.5),
  },
}));
