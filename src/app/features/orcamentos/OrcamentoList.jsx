import React, { Fragment, useMemo } from "react";

import { Box, List, ListItemText, ListItemSecondaryAction, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Avatar, DataTable, LTreeChip, RouterListItem } from "app/components";
import Column from "app/components/DataTable/Column";

import SituacaoOrcamentoSelect from "./SituacaoOrcamentoSelect";

import { useMobileMediaQuery } from "app/hooks";

import { formatCurrency } from "app/utils/formatUtils";
import { ltreeCompare } from "app/utils/ltreeUtils";

function OrcamentoList({ orcamentos, onClick, onUpdateClick }) {
  const isMobile = useMobileMediaQuery();

  const orcamentoByCodigo = useMemo(
    () =>
      orcamentos.reduce((acc, orcamento) => {
        if (!acc.has(orcamento.codigo)) {
          acc.set(orcamento.codigo, []);
        }
        acc.get(orcamento.codigo).push(orcamento);
        return acc;
      }, new Map()),
    [orcamentos],
  );

  const codigos = useMemo(() => Array.from(orcamentoByCodigo.keys()).sort(ltreeCompare), [orcamentoByCodigo]);

  if (!codigos) {
    return false;
  }

  return isMobile ? (
    <OrcamentoListMobile codigos={codigos} orcamentoByCodigo={orcamentoByCodigo} onClick={onClick} />
  ) : (
    <OrcamentoListDesktop
      codigos={codigos}
      orcamentoByCodigo={orcamentoByCodigo}
      onClick={onClick}
      onUpdateClick={onUpdateClick}
    />
  );
}

function OrcamentoListMobile({ codigos, orcamentoByCodigo }) {
  const classes = useStyles();

  return (
    <Box py={1}>
      {codigos.map((codigo) => (
        <List
          subheader={
            !!codigo && <OrcamentoGroupHeader codigo={codigo} descricao={orcamentoByCodigo.get(codigo)[0].descricao} />
          }
          key={codigo}
        >
          {orcamentoByCodigo.get(codigo).map((item) => (
            <Fragment key={`f_${item.id}`}>
              <RouterListItem to={`/projetos/${item.projetoId}/orcamentos/${item.id}`} key={`i_${item.id}`} divider>
                <ListItemText
                  primary={item.nomeFornecedor}
                  secondary={formatCurrency(item.valorLiquido)}
                  classes={{ primary: classes.listItemPrimary }}
                />
                <ListItemSecondaryAction>
                  <SituacaoOrcamentoSelect value={item.situacao} onChange={(e) => alert(e.target.value)} />
                </ListItemSecondaryAction>
              </RouterListItem>
            </Fragment>
          ))}
        </List>
      ))}
    </Box>
  );
}

function OrcamentoListDesktop({ codigos, orcamentoByCodigo, onClick, onUpdateClick }) {
  return codigos.map((codigo) => (
    <Box py={1} key={codigo}>
      {!!codigo && <OrcamentoGroupHeader codigo={codigo} descricao={orcamentoByCodigo.get(codigo)[0].descricao} />}

      <DataTable key={codigo} value={orcamentoByCodigo.get(codigo)} onClick={onClick} onUpdateClick={onUpdateClick}>
        <Column field="nomeFornecedor" header="Fornecedor">
          {({ value }) => (
            <Box display="flex" alignItems="center">
              <Avatar size="small" />
              <Box flex={1} ml={1}>
                {value}
              </Box>
            </Box>
          )}
        </Column>
        <Column field="valorTotal" header="Valor total" numeric format={(value) => formatCurrency(value)} />
        <Column field="valorDesconto" header="Desconto" numeric format={(value) => formatCurrency(value)} />
        <Column field="valorFrete" header="Frete" numeric format={(value) => formatCurrency(value)} />
        <Column field="valorLiquido" header="Total líquido" numeric format={(value) => formatCurrency(value)} />
        <Column field="situacao" header="Situação">
          {({ value }) => <SituacaoOrcamentoSelect value={value} onChange={(e) => alert(e.target.value)} />}
        </Column>
      </DataTable>
    </Box>
  ));
}

function OrcamentoGroupHeader({ codigo, descricao }) {
  return (
    <Box p={2} display="flex" flexDirection="row" alignItems="center">
      <Box mr={2}>
        <LTreeChip label={codigo} size="medium" />
      </Box>
      <Typography variant="h6">{descricao}</Typography>
    </Box>
  );
}

const useStyles = makeStyles({
  listItemPrimary: {
    wordBreak: "break-word",
  },
});

export default OrcamentoList;
