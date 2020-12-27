import React from "react";
import { Form, TextField } from "app/components/forms/final-form";

export default function ClienteForm({ initialValues, onSubmit, children }) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => (!values.nome || !values.nome.trim() ? { nome: "Preencha este campo." } : null)}
    >
      {(props) => (
        <>
          <TextField name="nome" label="Nome" required autoFocus />
          {children(props)}
        </>
      )}
    </Form>
  );
}
