import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { clienteSelectors } from "app/features/clientes/clienteSlice";
import { Form, SelectField, TextField } from "app/components/forms/final-form";

export function ProjetoForm({ initialValues, onSubmit, children }) {
  const clientes = useSelector(clienteSelectors.selectAll);
  const clientesOptions = useMemo(() => clientes.map(({ id, nome }) => ({ value: id, label: nome })), [clientes]);
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => (!values.nome || !values.nome.trim() ? { nome: "Preencha este campo." } : null)}
    >
      {(props) => (
        <>
          <TextField name="nome" label="Nome" required autoFocus />
          <SelectField name="clienteId" label="Cliente" required options={clientesOptions} />
          {children(props)}
        </>
      )}
    </Form>
  );
}
