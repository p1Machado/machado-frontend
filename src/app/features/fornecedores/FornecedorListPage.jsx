import React, { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fornecedorSelectors, fetchFornecedores, saveFornecedor, updateFornecedor } from "./fornecedorSlice";

import { FornecedorFormDialog } from "app/features/fornecedores";

import { AddButton, DataTable } from "app/components";
import Column from "app/components/DataTable/Column";

import { AppBarAction, AppBarTitle, AppContent } from "app/layouts";
import { Alert } from "app/utils/alertUtils";

function FornecedorList() {
  const dispatch = useDispatch();

  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const [currentFornecedorId, setCurrentFornecedorId] = useState(null);
  const currentFornecedor = useSelector((state) => fornecedorSelectors.selectById(state, currentFornecedorId));
  const fornecedores = useSelector(fornecedorSelectors.selectAll);

  const handleSave = useCallback(
    async (values) => {
      if (!values.id) {
        await dispatch(saveFornecedor(values));
        Alert.success("Fornecedor salvo com sucesso!");
      } else {
        await dispatch(updateFornecedor(values));
        Alert.success("Fornecedor atualizado com sucesso!");
      }
      setFormDialogOpen(false);
    },
    [dispatch],
  );

  const handleClick = (e) => {
    setFormDialogOpen(true);
    setCurrentFornecedorId(e.target.value.id);
  };

  useEffect(() => {
    dispatch(fetchFornecedores());
  }, [dispatch]);

  return (
    <AppContent disablePadding>
      <AppBarTitle>Fornecedores</AppBarTitle>
      <AppBarAction>
        <AddButton onClick={() => setFormDialogOpen(true)}>fornecedor</AddButton>
      </AppBarAction>
      <FornecedorFormDialog
        initialValues={currentFornecedor}
        onSubmit={handleSave}
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onExited={() => setCurrentFornecedorId(null)}
      />
      {!!fornecedores?.length && (
        <DataTable value={fornecedores} onClick={handleClick} onUpdateClick={handleClick}>
          <Column field="nome" header="Nome" />
          <Column field="cpfCnpj" header="CPF/CNPJ" />
        </DataTable>
      )}
    </AppContent>
  );
}

export default FornecedorList;
