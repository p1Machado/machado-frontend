import React from "react";
import { useParams } from "react-router-dom";
import { Avatar, List, ListItemAvatar, ListItemText } from "@material-ui/core";
import { RouterListItem } from "app/components";

export function ProjetoFornecedorTabPanel({ fornecedores }) {
  const { projetoId } = useParams();
  return (
    <div>
      <List>
        {fornecedores?.map((f) => (
          <RouterListItem key={f.id} to={`/projetos/${projetoId}/fornecedores/${f.id}`}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={f.nome} />
          </RouterListItem>
        ))}
      </List>
    </div>
  );
}
