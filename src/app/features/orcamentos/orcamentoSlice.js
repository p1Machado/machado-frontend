import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import orcamentoAPI from "app/api/orcamentoAPI";
import { fetchFornecedoresByProjetoId } from "../fornecedores/fornecedorSlice";

const orcamentoAdapter = createEntityAdapter();

const orcamentoSlice = createSlice({
  name: "orcamento",
  initialState: orcamentoAdapter.getInitialState(),
  reducers: {
    addedOrcamento: orcamentoAdapter.upsertOne,
    addedOrcamentos: orcamentoAdapter.addMany,
  },
});

const _orcamentoSelectors = orcamentoAdapter.getSelectors((state) => state[orcamentoSlice.name]);

export const orcamentoSelectors = {
  ..._orcamentoSelectors,
  selectAllByProjetoId: createSelector(
    _orcamentoSelectors.selectAll,
    (_, projetoId) => projetoId,
    (orcamentos, projetoId) => {
      return orcamentos.filter((orcamento) => orcamento.projetoId === projetoId);
    },
  ),
};

export const saveOrcamento = (orcamento) => async (dispatch) => {
  const response = await orcamentoAPI.save(orcamento);
  const newOrcamento = { ...orcamento };
  newOrcamento.id = response.data;
  await Promise.all([
    dispatch(fetchFornecedoresByProjetoId(orcamento.projetoId)),
    dispatch(fetchOrcamentosByProjetoId(orcamento.projetoId)),
  ]);
  dispatch(fetchOrcamento(newOrcamento.id));
};

export const fetchOrcamento = (orcamentoId) => async (dispatch) => {
  const orcamento = await orcamentoAPI.getById(orcamentoId);
  dispatch(addedOrcamento(orcamento));
};

export const fetchOrcamentosByProjetoId = (projetoId) => async (dispatch) => {
  const orcamentos = await orcamentoAPI.getAllByProjetoId(projetoId);
  dispatch(addedOrcamentos(orcamentos));
};

export const { addedOrcamento, addedOrcamentos } = orcamentoSlice.actions;

export default orcamentoSlice;
