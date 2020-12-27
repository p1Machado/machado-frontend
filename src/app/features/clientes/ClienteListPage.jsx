import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clienteSelectors, fetchClientes, saveCliente, updateCliente } from "./clienteSlice";

import { ClienteFormDialog } from "app/features/clientes";

import { AddButton, DataTable } from "app/components";
import Column from "app/components/DataTable/Column";

import { AppBarAction, AppBarTitle, AppContent } from "app/layouts";
import { Alert } from "app/utils/alertUtils";

function ClienteListPage() {
  const dispatch = useDispatch();

  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const [currentClienteId, setCurrentClienteId] = useState(null);
  const currentCliente = useSelector((state) => clienteSelectors.selectById(state, currentClienteId));
  const clientes = useSelector(clienteSelectors.selectAll);

  const handleSave = useCallback(
    async (values) => {
      if (!values.id) {
        await dispatch(saveCliente(values));
        Alert.success("Cliente salvo com sucesso!");
      } else {
        await dispatch(updateCliente(values));
        Alert.success("Cliente atualizado com sucesso!");
      }
      setFormDialogOpen(false);
    },
    [dispatch],
  );

  const handleClick = (e) => {
    setFormDialogOpen(true);
    setCurrentClienteId(e.target.value.id);
  };

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  return (
    <AppContent>
      <AppBarTitle>Clientes</AppBarTitle>
      <AppBarAction>
        <AddButton onClick={() => setFormDialogOpen(true)}>cliente</AddButton>
      </AppBarAction>
      <ClienteFormDialog
        initialValues={currentCliente}
        onSubmit={handleSave}
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onExited={() => setCurrentClienteId(null)}
      />
      {!!clientes?.length && (
        <DataTable value={clientes} onClick={handleClick} onUpdateClick={handleClick}>
          <Column field="nome" header="Nome" />
        </DataTable>
      )}
    </AppContent>
  );
}

export default ClienteListPage;
