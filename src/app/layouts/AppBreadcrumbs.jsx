import React from "react";

import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

export function AppBreadcrumbs() {
  const root = useRouteMatch({ path: "/projetos", exact: true });
  const projeto = useRouteMatch("/projetos/:id");
  const orcamento = useRouteMatch("/projetos/:projetoId/orcamentos/:orcamentoId");
  const fornecedor = useRouteMatch("/projetos/:projetoId/fornecedores/:fornecedorId");
  return (
    !root && (
      <Breadcrumbs>
        <Link to="/projetos" component={RouterLink}>
          <Typography variant="overline">Projetos</Typography>
        </Link>
        {!!projeto && (!!orcamento || !!fornecedor) && (
          <Link to={projeto.url} component={RouterLink}>
            <Typography variant="overline">Radio Jovem Pan</Typography>
          </Link>
        )}
        {!!projeto && !orcamento && !fornecedor && (
          <Typography variant="overline" color="textPrimary">
            Radio Jovem Pan
          </Typography>
        )}
        {!!orcamento && (
          <Link to={projeto.url + "/orcamentos"} component={RouterLink}>
            <Typography variant="overline">Orçamentos</Typography>
          </Link>
        )}
        {!!orcamento && (
          <Typography variant="overline" color="textPrimary">
            Forros
          </Typography>
        )}
        {!!fornecedor && (
          <Link to={projeto.url + "/fornecedores"} component={RouterLink}>
            <Typography variant="overline">Fornecedores</Typography>
          </Link>
        )}
        {!!fornecedor && (
          <Typography variant="overline" color="textPrimary">
            ARC Gesso
          </Typography>
        )}
      </Breadcrumbs>
    )
  );
}
