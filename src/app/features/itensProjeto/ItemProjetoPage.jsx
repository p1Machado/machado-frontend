import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { projetoSelectors, fetchProjeto } from "app/features/projetos/projetoSlice";
import { ItemProjetoFormDialog } from "app/features/itensProjeto";
import { itemProjetoSelectors, updateItemProjeto } from "app/features/itensProjeto/itemProjetoSlice";

import { AppBarTitle, AppBarExtra, AppBarAction, AppContent } from "app/layouts";
import { EditButton, LTreeChip } from "app/components";

import { Typography, Box, List, ListItem, ListItemText } from "@material-ui/core";

export function ItemProjetoPage() {
  const dispatch = useDispatch();
  const { projetoId: paramProjetoId, itemId: paramItemId } = useParams();
  const projetoId = useMemo(() => Number(paramProjetoId), [paramProjetoId]);
  const itemId = useMemo(() => paramItemId, [paramItemId]);
  const projeto = useSelector((state) => projetoSelectors.selectById(state, projetoId));
  const itemProjeto = useSelector((state) => itemProjetoSelectors.selectById(state, itemId));
  const [open, setOpen] = useState(false);

  const handleUpdateItemProjeto = useCallback(
    async (values) => {
      await dispatch(updateItemProjeto(projetoId, values));
      setOpen(false);
    },
    [projetoId, dispatch],
  );

  useEffect(() => {
    if (!projeto) {
      dispatch(fetchProjeto(projetoId));
    }
  }, [projeto, projetoId, dispatch]);

  return (
    !!itemProjeto && (
      <>
        <AppBarTitle>
          <Typography variant="h6">{itemProjeto.descricao}</Typography>
          <Typography variant="body2" component="span">
            {"Código: "}
            <LTreeChip label={itemProjeto.codigo} />
          </Typography>
        </AppBarTitle>
        <AppBarExtra>
          <Box pt={2} pl={6.5} pr={2} pb={2}>
            <Typography variant="subtitle1">{itemProjeto.especificacao || "Não especificado"}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="baseline">
              <Typography variant="subtitle1">Quantidade</Typography>
              <Typography variant="h6">
                {itemProjeto.quantidade} {itemProjeto.unidade}
              </Typography>
            </Box>
          </Box>
        </AppBarExtra>
        <AppBarAction>
          <EditButton
            onClick={() => {
              setOpen(true);
            }}
          >
            editar
          </EditButton>
        </AppBarAction>
        <ItemProjetoFormDialog
          open={open}
          onClose={() => setOpen(false)}
          initialValues={itemProjeto}
          onSubmit={handleUpdateItemProjeto}
        />
        <AppContent backButtonMargin>
          <Box mt={3}>
            <Typography variant="overline">orçamentos</Typography>
            <List dense disablePadding>
              <ListItem divider disableGutters>
                <ListItemText primary="Orçamento 1" secondary="secondary" />
              </ListItem>
              <ListItem divider disableGutters>
                <ListItemText primary="Orçamento 2" secondary="secondary" />
              </ListItem>
            </List>
          </Box>
        </AppContent>
      </>
    )
  );
}
