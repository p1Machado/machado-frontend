import React from "react";

import { deburr } from "lodash";

import { Form, TextField } from "app/components/forms/final-form";

import { itemProjetoSelectors } from "app/features/itensProjeto/itemProjetoSlice";
import { useStore } from "react-redux";

export function ItemProjetoForm({ initialValues, onSubmit, children }) {
  const store = useStore();
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.codigo) {
          errors.codigo = "Preencha este campo.";
        } else if (
          !values.id &&
          !!itemProjetoSelectors.selectByCodigo(store.getState(), values.codigo.replace(/\.$/, ""))
        ) {
          errors.codigo = "O código deve ser único.";
        }
        if (!values.descricao || !values.descricao.trim()) {
          errors.descricao = "Preencha este campo.";
        }
        return errors;
      }}
      style={{
        display: "grid",
        gridTemplateAreas: `
        "codigo ."
        "descricao descricao"
        "especificacao especificacao"
        "quantidade unidade"
        "divider divider"
        `,
        columnGap: "1em",
        rowGap: "1em",
      }}
    >
      <TextField
        name="codigo"
        label="Código"
        parse={(value) =>
          deburr(value)
            .toUpperCase()
            .replace(/[^\w.]|(\.)(?=\.)+|^\./, "")
        }
        required
        autoFocus
      />
      <TextField name="descricao" label="Descrição" required />
      <TextField name="especificacao" label="Especificação" />
      <TextField name="unidade" label="Unidade" />
      <TextField name="quantidade" label="Quantidade" />
      <div>{children}</div>
    </Form>
  );
}
