import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import fornecedorAPI from "app/api/fornecedorAPI";

const fornecedorAdapter = createEntityAdapter({ sortComparer: (a, b) => a.nome > b.nome });

const fornecedorSlice = createSlice({
  name: "fornecedor",
  initialState: fornecedorAdapter.getInitialState({ idsByProjetoId: {} }),
  reducers: {
    addedFornecedor: fornecedorAdapter.addOne,
    updatedFornecedor: fornecedorAdapter.updateOne,
    addedFornecedores: fornecedorAdapter.addMany,
    addedIdsByProjetoId(state, { payload: { projetoId, ids } }) {
      state.idsByProjetoId[projetoId] = ids;
    },
  },
});

const _fornecedorSelectors = fornecedorAdapter.getSelectors((state) => state[fornecedorSlice.name]);

export const fornecedorSelectors = {
  ..._fornecedorSelectors,
  selectAllByProjetoId: createSelector(
    (state, projetoId) => state[fornecedorSlice.name].idsByProjetoId[projetoId] ?? [],
    _fornecedorSelectors.selectEntities,
    (ids, entities) => ids.map((id) => entities[id]),
  ),
};

export const fetchFornecedores = () => async (dispatch) => {
  const response = await fornecedorAPI.getAll();
  dispatch(addedFornecedores(response));
};

export const fetchFornecedoresByProjetoId = (projetoId) => async (dispatch) => {
  const fornecedores = await fornecedorAPI.getAllByProjetoId(projetoId);
  dispatch(addedFornecedores(fornecedores));
  dispatch(
    addedIdsByProjetoId({
      projetoId,
      ids: fornecedores.sort(fornecedorAdapter.sortComparer).map((fornecedor) => fornecedor.id),
    }),
  );
};

export const saveFornecedor = (fornecedor) => async (dispatch) => {
  const response = await fornecedorAPI.save(fornecedor);
  const newFornecedor = { ...fornecedor };
  newFornecedor.id = Number(response.data);
  dispatch(addedFornecedor(newFornecedor));
};

export const updateFornecedor = (fornecedor) => async (dispatch) => {
  await fornecedorAPI.update(fornecedor);
  dispatch(updatedFornecedor({ id: fornecedor.id, changes: fornecedor }));
};

export const { addedFornecedor, updatedFornecedor, addedFornecedores, addedIdsByProjetoId } = fornecedorSlice.actions;

export default fornecedorSlice;
