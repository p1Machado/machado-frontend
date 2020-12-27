import React, { useState, useEffect, useMemo } from "react";

import { fetchProjeto, projetoSelectors } from "app/features/projetos/projetoSlice";
import { itemOrcamentoSelectors } from "app/features/itensOrcamento/itemOrcamentoSlice";
import { itemProjetoSelectors } from "app/features/itensProjeto/itemProjetoSlice";
import { fetchFornecedoresByProjetoId, fornecedorSelectors } from "app/features/fornecedores/fornecedorSlice";
import { fetchOrcamentosByProjetoId, orcamentoSelectors } from "app/features/orcamentos/orcamentoSlice";
import { useDispatch, useSelector } from "react-redux";

import { Switch, Route, useHistory, useParams, useLocation } from "react-router-dom";

import { Box, LinearProgress, Tabs, Tab, Typography, Divider } from "@material-ui/core";
import { AppBarLoading, AppBarTitle, AppContent, AppBarExtra } from "app/layouts";
import { Alert } from "app/utils/alertUtils";

import { ProjetoItemProjetoTabPanel, ProjetoFornecedorTabPanel, ProjetoOrcamentoTabPanel } from "app/features/projetos";

import { useMobileMediaQuery } from "app/hooks";

export function ProjetoPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMobileMediaQuery();

  const { pathname } = useLocation();
  const { projetoId: paramProjetoId } = useParams();
  const projetoId = useMemo(() => Number(paramProjetoId), [paramProjetoId]);

  const projeto = useSelector((state) => projetoSelectors.selectById(state, projetoId));
  const _itensProjeto = useSelector((state) => itemProjetoSelectors.selectAllByProjetoId(state, projetoId));
  const itensProjetoIds = useMemo(() => _itensProjeto.map(({ id }) => id), [_itensProjeto]);
  const itensOrcamento = useSelector((state) =>
    itemOrcamentoSelectors.selectAllByItemProjetoIds(state, itensProjetoIds),
  );
  const itensOrcamentoByItemProjetoId = useMemo(
    () =>
      itensOrcamento.reduce((acc, itemOrcamento) => {
        if (!acc[itemOrcamento.itemProjetoId]) {
          acc[itemOrcamento.itemProjetoId] = [];
        }
        acc[itemOrcamento.itemProjetoId].push(itemOrcamento);
        return acc;
      }, {}),
    [itensOrcamento],
  );
  const itensProjeto = useMemo(
    () =>
      _itensProjeto.map(({ itensOrcamento, ...itemProjeto }) => {
        itemProjeto.itensOrcamento = itensOrcamentoByItemProjetoId[itemProjeto.id];
        return itemProjeto;
      }),
    [_itensProjeto, itensOrcamentoByItemProjetoId],
  );
  const fornecedores = useSelector((state) => fornecedorSelectors.selectAllByProjetoId(state, projetoId));
  const orcamentos = useSelector((state) => orcamentoSelectors.selectAllByProjetoId(state, projetoId));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(fetchProjeto(projetoId)),
          dispatch(fetchFornecedoresByProjetoId(projetoId)),
          dispatch(fetchOrcamentosByProjetoId(projetoId)),
        ]);
        setLoading(false);
      } catch (err) {
        Alert.error("Algo deu errado! :(");
        console.error(err);
      }
    }
    fetchData();
  }, [projetoId, dispatch]);

  return (
    <>
      <AppBarLoading loading={loading}>
        <LinearProgress />
      </AppBarLoading>
      {!!projeto && (
        <>
          <AppBarTitle>
            <Typography variant="h5">{projeto.nome}</Typography>
            <Typography variant="body2">{projeto.nomeCliente}</Typography>
          </AppBarTitle>
          <AppBarExtra>
            <Box px={isMobile ? 0 : 2}>
              <Tabs
                value={pathname}
                onChange={(_, value) => history.push(value)}
                variant={isMobile ? "fullWidth" : "standard"}
              >
                <Tab label="ITENS" value={`/projetos/${projetoId}/itens-projeto`} />
                <Tab label="ORÇAMENTOS" value={`/projetos/${projetoId}/orcamentos`} disabled={!orcamentos?.length} />
                {/* <Tab
                  label="FORNECEDORES"
                  value={`/projetos/${projetoId}/fornecedores`}
                  disabled={!fornecedores?.length}
                /> */}
              </Tabs>
            </Box>
            <Divider />
          </AppBarExtra>
          <AppContent loading={loading} disablePadding>
            <Box flex={1} overflow="auto">
              <Switch>
                <Route path="/projetos/:projetoId/itens-projeto">
                  <ProjetoItemProjetoTabPanel itens={itensProjeto} projetoId={projetoId} />
                </Route>
                <Route path="/projetos/:projetoId/orcamentos">
                  <ProjetoOrcamentoTabPanel orcamentos={orcamentos} />
                </Route>
                <Route path="/projetos/:projetoId/fornecedores">
                  <ProjetoFornecedorTabPanel fornecedores={fornecedores} />
                </Route>
              </Switch>
            </Box>
          </AppContent>
        </>
      )}
    </>
  );
}
