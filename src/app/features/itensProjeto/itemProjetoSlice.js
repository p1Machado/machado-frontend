import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { ltreeCompare } from "app/utils/ltreeUtils";
import { addedProjeto } from "app/features/projetos/projetoSlice";
import itemProjetoAPI from "app/api/itemProjetoAPI";

const itemProjetoAdapter = createEntityAdapter({
  sortComparer: (a, b) => ltreeCompare(a.codigo, b.codigo),
});

const itemProjetoSlice = createSlice({
  name: "itemProjeto",
  initialState: itemProjetoAdapter.getInitialState(),
  reducers: {
    addedItemProjeto: itemProjetoAdapter.addOne,
    updatedItemProjeto: itemProjetoAdapter.updateOne,
  },
  extraReducers: {
    [addedProjeto]: (state, { payload: projeto }) => {
      if (projeto.itens?.length) {
        itemProjetoAdapter.addMany(state, projeto.itens);
      }
    },
  },
});

export const { addedItemProjeto, updatedItemProjeto } = itemProjetoSlice.actions;

export const saveItemProjeto = (projetoId, itemProjeto) => async (dispatch) => {
  const response = await itemProjetoAPI.save(projetoId, itemProjeto);
  const newItemProjeto = { ...itemProjeto };
  newItemProjeto.id = response.data;
  newItemProjeto.projetoId = projetoId;
  dispatch(addedItemProjeto(newItemProjeto));
};

export const updateItemProjeto = (projetoId, itemProjeto) => async (dispatch) => {
  await itemProjetoAPI.update(projetoId, itemProjeto);
  dispatch(updatedItemProjeto({ id: itemProjeto.id, changes: itemProjeto }));
};

const _itemProjetoSelectors = itemProjetoAdapter.getSelectors((state) => state[itemProjetoSlice.name]);

const selectAllByProjetoId = createSelector(
  _itemProjetoSelectors.selectAll,
  (_, projetoId) => projetoId,
  (itensProjeto, projetoId) => itensProjeto.filter((item) => item.projetoId === projetoId),
);

const selectAllByIds = createSelector(
  _itemProjetoSelectors.selectEntities,
  (_, ids) => ids,
  (entities, ids) => ids.map((id) => entities[id]).sort(itemProjetoAdapter.sortComparer),
);

const selectByCodigo = createSelector(
  _itemProjetoSelectors.selectAll,
  (_, codigo) => codigo,
  (itensProjeto, codigo) => itensProjeto.find((item) => item.codigo === codigo),
);

export const itemProjetoSelectors = {
  ..._itemProjetoSelectors,
  selectAllByProjetoId,
  selectAllByIds,
  selectByCodigo,
};

export default itemProjetoSlice;
