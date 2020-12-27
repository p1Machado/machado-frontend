import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { orcamentoSelectors, fetchOrcamento } from "app/features/orcamentos/orcamentoSlice";

import { Box, Button, FormControl, InputLabel, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { AppBarTitle, AppBarAction, AppContent } from "app/layouts";
import { DataTable, EditButton, LTreeChip } from "app/components";
import Column from "app/components/DataTable/Column";

import { formatCurrency } from "app/utils/formatUtils";

function OrcamentoPage() {
  const dispatch = useDispatch();
  const { orcamentoId } = useParams();
  const orcamento = useSelector((state) => orcamentoSelectors.selectById(state, Number(orcamentoId)));
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!orcamento || !orcamento.itens) {
      dispatch(fetchOrcamento(orcamentoId));
    }
  }, [orcamento, orcamentoId, dispatch]);

  return (
    !!orcamento && (
      <>
        <AppBarTitle>
          <Typography variant="h6">{orcamento.descricao}</Typography>
          <Typography variant="body2" component="span">
            {"Código: "}
            <LTreeChip label={orcamento.codigo} />
          </Typography>
        </AppBarTitle>
        <AppBarAction>
          <EditButton
            // onClick={() => {
            //   setOpen(true);
            // }}
          >
            editar
          </EditButton>
        </AppBarAction>
        <AppContent fluid disablePadding>
          <Box mx="auto" display="flex">
            <Box pt={3} pr={2} pb={4} pl={4} flex={1}>
              <DataTable value={orcamento.itens}>
                <Column field="itemProjeto.codigo" header="Cód." />
                <Column field="itemProjeto.descricao" header="Descrição" />
                <Column field="itemProjeto.quantidade" header="Qtd." numeric />
                <Column field="itemProjeto.unidade" header="Un." />
                <Column
                  field="valorUnitario"
                  header="Valor unitário"
                  numeric
                  format={(value) => formatCurrency(value)}
                />
                <Column field="subtotal" header="Subtotal" numeric format={(value) => formatCurrency(value)} />
              </DataTable>
            </Box>
            <Box pt={3} pr={2.5} pb={4} pl={3} width="calc(0.333 * min(1280px, 75%));">
              <Box marginLeft="-1px" mb={3}>
                <Button variant="outlined" endIcon={<ExpandMore />}>
                  {orcamento.situacao}
                </Button>
              </Box>
              <FormControl variant="standard" margin="dense">
                <InputLabel shrink>Fornecedor</InputLabel>
                <Box mt={2.5}>
                  <Typography variant="subtitle1">{orcamento.nomeFornecedor}</Typography>
                </Box>
              </FormControl>
              <FormControl variant="standard" margin="dense">
                <InputLabel shrink>Valor total</InputLabel>
                <Box mt={2.5}>
                  <Typography variant="subtitle1">{formatCurrency(orcamento.valorTotal)}</Typography>
                </Box>
              </FormControl>
              <FormControl variant="standard" margin="dense">
                <InputLabel shrink>Frete</InputLabel>
                <Box mt={2.5}>
                  <Typography variant="subtitle1">{formatCurrency(orcamento.valorFrete)}</Typography>
                </Box>
              </FormControl>
              <FormControl variant="standard" margin="dense">
                <InputLabel shrink>Desconto</InputLabel>
                <Box mt={2.5}>
                  <Typography variant="subtitle1">{formatCurrency(orcamento.valorDesconto)}</Typography>
                </Box>
              </FormControl>
              <FormControl variant="standard" margin="dense">
                <InputLabel shrink>Total líquido</InputLabel>
                <Box mt={2.5}>
                  <Typography variant="subtitle1">{formatCurrency(orcamento.valorLiquido)}</Typography>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </AppContent>
      </>
    )
  );
}

export default OrcamentoPage;
