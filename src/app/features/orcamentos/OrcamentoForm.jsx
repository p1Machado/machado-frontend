import { Divider, Grid, TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { DataTable } from "app/components";
import Column from "app/components/DataTable/Column";
import { SelectField, TextField as FormTextField } from "app/components/forms/final-form";
import { bancoSelectors, fetchBancos } from "app/features/bancos/bancoSlice";
import { fetchFornecedores, fornecedorSelectors } from "app/features/fornecedores/fornecedorSlice";
import { itemProjetoSelectors } from "app/features/itensProjeto/itemProjetoSlice";
import { formatCurrency } from "app/utils/formatUtils";
import createDecorator from "final-form-calculate";
import React, { useEffect, useMemo, useRef } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";

export function OrcamentoForm({ initialValues, onSubmit, projetoId, itensIds, children }) {
  const dispatch = useDispatch();

  const itensProjetoById = useSelector(itemProjetoSelectors.selectEntities);

  const _itensOrcamento = useMemo(
    () =>
      !itensIds
        ? initialValues?.itens ?? []
        : itensIds.map((id) => ({ itemProjeto: itensProjetoById[id], itemProjetoId: id })),
    [initialValues, itensIds, itensProjetoById],
  );
  const leafItemProjetoIds = useMemo(() => {
    const itensProjeto = _itensOrcamento.map(({ itemProjeto }) => itemProjeto);
    const _leafItemProjetoIds = itensProjeto
      .filter((item) => !someChildren(item.codigo, itensProjeto))
      .map(({ id }) => id);

    if (_leafItemProjetoIds.length === _itensOrcamento.length) {
      return _itensOrcamento.map(({ itemProjetoId }) => itemProjetoId);
    }

    return _leafItemProjetoIds;
  }, [_itensOrcamento]);

  const itensOrcamento = useMemo(
    () => _itensOrcamento.filter((itemOrcamento) => leafItemProjetoIds.includes(itemOrcamento.itemProjetoId)),
    [_itensOrcamento, leafItemProjetoIds],
  );

  const fornecedores = useSelector(fornecedorSelectors.selectAll);
  const fornecedoresOptions = useMemo(() => fornecedores.map(({ id, nome }) => ({ value: id, label: nome })), [
    fornecedores,
  ]);
  const fornecedoresById = useMemo(
    () =>
      fornecedores.reduce((acc, fornecedor) => {
        acc[fornecedor.id] = fornecedor;
        return acc;
      }, {}),
    [fornecedores],
  );
  const fornecedoresByIdRef = useRef(fornecedoresById);
  fornecedoresByIdRef.current = fornecedoresById;

  const bancos = useSelector(bancoSelectors.selectAll);
  const bancosOptions = useMemo(
    () => bancos.map(({ id, compe, nome }) => ({ value: id, label: `${compe} - ${nome}` })),
    [bancos],
  );

  useEffect(() => {
    dispatch(fetchBancos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFornecedores());
  }, [dispatch]);

  return (
    <Form
      onSubmit={(values) => {
        const newValues = { ...values };
        const newItens = values.itens
          .filter((item) => leafItemProjetoIds.includes(item.itemProjetoId))
          .map((item) => {
            const newItem = { ...item };
            const itemProjeto = newItem.itemProjeto;
            if (itemProjeto) {
              delete newItem.itemProjeto;
              newItem.itemProjetoId = itemProjeto.id;
            }
            return newItem;
          });
        newValues.itens = newItens;
        onSubmit(newValues);
      }}
      initialValues={{ projetoId, ...initialValues, itens: itensOrcamento }}
      decorators={[decorator]}
      subscription={{ submitting: true }}
      validate={(values) => {
        if (!values.fornecedorId) {
          return { fornecedorId: "Campo obrigatório" };
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <SelectField label="Fornecedor" name="fornecedorId" required options={fornecedoresOptions} />
            </Grid>
            <Grid item xs={4}>
              <Field name="prazoEntrega">
                {({ input, meta }) => (
                  <DatePicker
                    label="Prazo de entrega"
                    mask="__/__/____"
                    value={input.value}
                    onChange={input.onChange}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        inputProps={{ ...props.inputProps, placeholder: undefined }}
                        error={(meta.touched && meta.error) || meta.submitError}
                        helperText={undefined}
                        required
                      />
                    )}
                    autoOk
                    required
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="itens">
                {({ input }) => (
                  <DataTable value={input.value} onChange={input.onChange}>
                    <Column field="itemProjeto.codigo" header="Cód." />
                    <Column field="itemProjeto.descricao" header="Descrição" />
                    <Column field="itemProjeto.quantidade" header="Quantidade" numeric />
                    <Column field="itemProjeto.unidade" header="Un." />
                    <Column field="valorUnitario" header="Valor unitário (R$) *" numeric>
                      {({ value, rowValue, onRowChange }) => {
                        const leaf = leafItemProjetoIds.includes(rowValue.itemProjetoId);

                        if (!leaf) {
                          return (value) => formatCurrency(value);
                        }

                        return (
                          <TextField
                            defaultValue={value}
                            onBlur={(e) => {
                              const valorUnitario = e.target.value;
                              const { quantidade } = rowValue.itemProjeto;
                              onRowChange({
                                ...rowValue,
                                valorUnitario,
                                subtotal: valorUnitario * quantidade,
                              });
                            }}
                            inputProps={{ onFocus: (e) => e.target.select(), style: { textAlign: "right" } }}
                            type="number"
                            margin="none"
                            size="small"
                            required
                          />
                        );
                      }}
                    </Column>
                    <Column field="subtotal" header="Subtotal (R$)" numeric format={(value) => formatCurrency(value)} />
                  </DataTable>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Dados bancários</Typography>
            </Grid>

            <Grid item xs={4}>
              <SelectField name="dadosBancarios.bancoId" label="Banco" options={bancosOptions} />
            </Grid>
            <Grid item xs={4}>
              <FormTextField name="dadosBancarios.operacao" label="Operação" />
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center", textAlign: "right" }}>
              <Typography>Valor total</Typography>
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center" }}>
              <Field name="valorTotal">
                {({ input }) => <Typography variant="h6">{formatCurrency(input.value || 0)}</Typography>}
              </Field>
            </Grid>

            <Grid item xs={4}>
              <FormTextField name="dadosBancarios.agencia" label="Agência" />
            </Grid>
            <Grid item xs={4}>
              <FormTextField name="dadosBancarios.conta" label="Conta" />
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center", textAlign: "right" }}>
              <Typography>Desconto (R$)</Typography>
            </Grid>
            <Grid item xs={2}>
              <FormTextField name="valorDesconto" type="number" label="Desconto" />
            </Grid>

            <Grid item xs={4}>
              <FormTextField name="formaPagamento" label="Forma de pagamento" />
            </Grid>
            <Grid item xs={4}>
              <FormTextField name="condicaoPagamento" label="Condição de pagamento" />
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center", textAlign: "right" }}>
              <Typography>Frete (R$)</Typography>
            </Grid>
            <Grid item xs={2}>
              <FormTextField name="valorFrete" type="number" label="Frete" />
            </Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Divider style={{ marginTop: "1em", marginBottom: ".5em" }} />
            </Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <Typography variant="h6">Total líquido</Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <Field name="valorLiquido">
                {({ input }) => <Typography variant="h6">{formatCurrency(input.value || 0)}</Typography>}
              </Field>
            </Grid>
          </Grid>

          <div>{children}</div>
        </form>
      )}
    </Form>
  );
}

const decorator = createDecorator(
  {
    field: "itens",
    updates: {
      valorTotal: (itens) => {
        return itens.reduce((valorTotal, item) => {
          return (item.subtotal ?? 0) * 1 + valorTotal;
        }, 0);
      },
    },
  },
  {
    field: "valorTotal",
    updates: {
      valorLiquido: (valorTotal, values) => {
        return calcularValorLiquido(valorTotal, values.valorDesconto, values.valorFrete);
      },
    },
  },
  {
    field: "valorDesconto",
    updates: {
      valorLiquido: (valorDesconto, values) => {
        return calcularValorLiquido(values.valorTotal, valorDesconto, values.valorFrete);
      },
    },
  },
  {
    field: "valorFrete",
    updates: {
      valorLiquido: (valorFrete, values) => {
        return calcularValorLiquido(values.valorTotal, values.valorDesconto, valorFrete);
      },
    },
  },
);

function someChildren(codigo, itens) {
  return itens.some((item) => item.codigo.startsWith(codigo + "."));
}

function calcularValorLiquido(_valorTotal = 0, _valorDesconto = 0, _valorFrete = 0) {
  let valorTotal = _valorTotal * 1;
  let valorDesconto = _valorDesconto * 1;
  let valorFrete = _valorFrete * 1;
  return valorTotal - valorDesconto * 1 + valorFrete * 1;
}
