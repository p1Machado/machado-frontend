import React, { useState, createRef, useCallback } from "react";
import csx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { saveItemProjeto, updateItemProjeto, itemProjetoSelectors } from "app/features/itensProjeto/itemProjetoSlice";
import { saveOrcamento } from "app/features/orcamentos/orcamentoSlice";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { AddButton } from "app/components";
import { AppBarAction } from "app/layouts";
import { Alert } from "app/utils/alertUtils";

import { OrcamentoFormDialog } from "app/features/orcamentos";
import { ItemProjetoFormDialog, ItemProjetoList } from "app/features/itensProjeto";

export function ProjetoItemProjetoTabPanel({ projetoId, itens }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openSaveItemProjeto, setOpenSaveItemProjeto] = useState(false);
  const [openUpdateItemProjeto, setOpenUpdateItemProjeto] = useState(false);
  const [openOrcamento, setOpenOrcamento] = useState(false);

  const [selected, setSelected] = useState([]);
  const [currentItemProjetoId, setCurrentItemProjetoId] = useState(null);
  const currentItemProjeto = useSelector((state) => itemProjetoSelectors.selectById(state, currentItemProjetoId));

  const handleSaveItemProjeto = useCallback(
    async (values) => {
      try {
        await dispatch(saveItemProjeto(projetoId, values));
        setOpenSaveItemProjeto(false);
        if (addButtonRef.current) {
          addButtonRef.current.focus();
        }
        Alert.success("Item salvo com sucesso!");
      } catch (err) {
        Alert.error("Não foi possível salvar o item... :(", err);
      }
    },
    [projetoId, dispatch],
  );

  const handleUpdateItemProjeto = useCallback(
    async (values) => {
      try {
        await dispatch(updateItemProjeto(projetoId, values));
        setOpenUpdateItemProjeto(false);
        setCurrentItemProjetoId(null);
        Alert.success("Item atualizado com sucesso!");
      } catch (err) {
        Alert.error("Não foi possível salvar o item... :(");
        console.error(err);
      }
    },
    [projetoId, dispatch],
  );

  const handleSaveOrcamento = useCallback(
    async (values) => {
      try {
        await dispatch(saveOrcamento(values));
        setOpenOrcamento(false);
        Alert.success("Orçamento salvo com sucesso!");
      } catch (err) {
        Alert.error("Não foi possível salvar o orçamento... :(", err);
      }
    },
    [dispatch],
  );

  return (
    <>
      <AppBarAction>
        {!!selected?.length && <AddButton onClick={() => setOpenOrcamento(true)}>orçamento</AddButton>}
        <AddButton onClick={() => setOpenSaveItemProjeto(true)}>item</AddButton>
      </AppBarAction>
      {!!itens?.length && (
        <ItemProjetoList
          projetoId={projetoId}
          itens={itens}
          selected={selected}
          onSelected={(selected) => setSelected(selected)}
          onUpdateClick={(e) => {
            setOpenUpdateItemProjeto(true);
            setCurrentItemProjetoId(e.target.value.id);
          }}
        />
      )}
      <div className={csx(classes.buttonContainer, { empty: !itens?.length })}>
        {(!itens || !itens.length) && (
          <>
            <Typography variant="h6">O projeto está vazio.</Typography>
            <Typography variant="subtitle1" style={{ marginBottom: 16 }}>
              Vamos começar?
            </Typography>
          </>
        )}
        <AddButton onClick={() => setOpenSaveItemProjeto(true)} ref={addButtonRef}>
          item
        </AddButton>
      </div>
      <ItemProjetoFormDialog
        onSubmit={handleSaveItemProjeto}
        open={openSaveItemProjeto}
        onClose={() => setOpenSaveItemProjeto(false)}
      />
      <ItemProjetoFormDialog
        initialValues={currentItemProjeto}
        onSubmit={handleUpdateItemProjeto}
        open={openUpdateItemProjeto}
        onClose={() => setOpenUpdateItemProjeto(false)}
        onExited={() => setCurrentItemProjetoId(null)}
      />
      <OrcamentoFormDialog
        projetoId={projetoId}
        itensIds={selected?.map(({ id }) => id)}
        onSubmit={handleSaveOrcamento}
        open={openOrcamento}
        onClose={() => setOpenOrcamento(false)}
      />
    </>
  );
}

const addButtonRef = createRef();

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    "&.empty": {
      padding: "unset",
      minHeight: "100%",
    },
  },
}));
