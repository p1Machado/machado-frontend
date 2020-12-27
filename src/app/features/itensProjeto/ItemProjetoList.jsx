import React, { Fragment } from "react";

import { Divider, List, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { LTreeChip, LTreeDataTable, RouterListItem } from "app/components";
import Column from "app/components/DataTable/Column";

import { withMobileLayout } from "app/layouts";

export const ItemProjetoList = withMobileLayout(ItemProjetoListMobile, ItemProjetoListDesktop);

function ItemProjetoListMobile({ projetoId, itens }) {
  const classes = useStyles();

  return (
    <List>
      {itens.map((item) => (
        <Fragment key={`f_${item.id}`}>
          <RouterListItem to={`/projetos/${projetoId}/itens-projeto/${item.id}`} key={`i_${item.id}`}>
            <ListItemText
              primary={item.descricao}
              secondary={parseItemRow(item)}
              classes={{ primary: classes.listItemPrimary }}
            />
          </RouterListItem>
          <Divider key={`d_${item.id}`} />
        </Fragment>
      ))}
    </List>
  );
}

function ItemProjetoListDesktop({ itens, selected, onSelected, onUpdateClick }) {
  return (
    <LTreeDataTable
      data={itens}
      selection={selected}
      onSelectionChange={onSelected}
      onUpdateClick={onUpdateClick}
      mapValueToLtree={(value) => value.codigo}
    >
      <Column field="codigo" header="Cód." padding="none">
        {({ value }) => <LTreeChip label={value} />}
      </Column>
      <Column field="descricao" header="Descrição" />
      <Column field="especificacao" header="Especificação" />
      <Column field="quantidade" header="Quantidade" numeric />
      <Column field="unidade" header="Un." />
    </LTreeDataTable>
  );
}

const parseItemRow = (item) => {
  let result = "";
  if (item.quantidade && item.unidade) {
    result += item.quantidade + " " + item.unidade + " — ";
  }
  result += item.especificacao || "Não especificado";
  return result;
};

const useStyles = makeStyles({
  listItemPrimary: {
    wordBreak: "break-word",
  },
});
