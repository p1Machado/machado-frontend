import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { addedOrcamento } from "../orcamentos/orcamentoSlice";

const itemOrcamentoAdapter = createEntityAdapter();

const itemOrcamentoSlice = createSlice({
  name: "itemOrcamento",
  initialState: itemOrcamentoAdapter.getInitialState(),
  reducers: {
    addedItemOrcamento: itemOrcamentoAdapter.addOne,
    updatedItemOrcamento: itemOrcamentoAdapter.updateOne,
  },
  extraReducers: {
    [addedOrcamento]: (state, { payload: orcamento }) => itemOrcamentoAdapter.addMany(state, orcamento.itens),
  },
});

export const {
  addedItemOrcamento: addedItemProjeto,
  updatedItemOrcamento: updatedItemProjeto,
} = itemOrcamentoSlice.actions;

const _itemOrcamentoSelectors = itemOrcamentoAdapter.getSelectors((state) => state[itemOrcamentoSlice.name]);

const selectAllByProjetoId = createSelector(
  _itemOrcamentoSelectors.selectAll,
  (_, projetoId) => projetoId,
  (itensOrcamento, projetoId) => itensOrcamento.find((itemOrcamento) => itemOrcamento.projetoId === projetoId),
);

const selectAllByItemProjetoIds = createSelector(
  _itemOrcamentoSelectors.selectAll,
  (_, ids) => ids,
  (itensOrcamento, ids) => itensOrcamento.filter((itemOrcamento) => ids.includes(itemOrcamento.itemProjetoId)),
);

export const itemOrcamentoSelectors = {
  ..._itemOrcamentoSelectors,
  selectAllByProjetoId,
  selectAllByItemProjetoIds,
};

export default itemOrcamentoSlice;
