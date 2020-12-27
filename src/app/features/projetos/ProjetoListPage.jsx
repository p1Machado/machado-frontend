import React, { useState, useEffect, useCallback } from "react";

import { saveProjeto, fetchProjetos, projetoSelectors } from "app/features/projetos/projetoSlice";
import { fetchClientes } from "app/features/clientes/clienteSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { AppBarAction, AppBarTitle, AppContent } from "app/layouts";
import { AddButton, LinkButton, LoadingButton } from "app/components";
import { ProjetoForm } from "app/features/projetos";
import { Alert } from "app/utils/alertUtils";

export function ProjetoListPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const projetos = useSelector(projetoSelectors.selectAll);

  const handleSaveProjeto = useCallback(
    async (values) => {
      try {
        await dispatch(saveProjeto(values));
        setOpen(false);
        Alert.success("Projeto salvo com sucesso!");
      } catch (err) {
        Alert.error(err.message);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchProjetos());
    dispatch(fetchClientes());
  }, [dispatch]);

  return (
    <AppContent>
      <AppBarTitle>Projetos</AppBarTitle>
      <AppBarAction>
        <AddButton onClick={() => setOpen(true)}>projeto</AddButton>
      </AppBarAction>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Novo Projeto</DialogTitle>
        <DialogContent>
          <ProjetoForm onSubmit={handleSaveProjeto}>
            {({ submitting }) => (
              <DialogActions>
                <Button onClick={() => setOpen(false)} tabIndex="-1">
                  CANCELAR
                </Button>
                <LoadingButton type="submit" loading={submitting}>
                  SALVAR
                </LoadingButton>
              </DialogActions>
            )}
          </ProjetoForm>
        </DialogContent>
      </Dialog>
      {projetos !== null &&
        projetos.map((projeto, index) => (
          <Box key={projeto.id} marginBottom={index < projetos.length - 1 ? 2 : 0}>
            <Card>
              <CardActionArea to={"/projetos/" + projeto.id} component={LinkButton}>
                <CardContent>
                  <Typography variant="h5">{projeto.nome}</Typography>
                  <Typography variant="body2">{projeto.nomeCliente}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
    </AppContent>
  );
}
