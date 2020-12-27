import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import projetoAPI from "app/api/projetoAPI";
import { clienteSelectors } from "app/features/clientes/clienteSlice";

const projetoAdapter = createEntityAdapter({ sortComparer: (a, b) => a.nome > b.nome });

const projetoSlice = createSlice({
  name: "projeto",
  initialState: projetoAdapter.getInitialState(),
  reducers: {
    addedProjeto(state, action) {
      const projeto = { ...action.payload };
      delete projeto.itens;
      projetoAdapter.addOne(state, projeto);
    },
    addedProjetos: projetoAdapter.addMany,
  },
});

export const projetoSelectors = projetoAdapter.getSelectors((state) => state[projetoSlice.name]);

export const fetchProjetos = () => async (dispatch) => {
  const response = await projetoAPI.getPage(0, 10);
  dispatch(addedProjetos(response.data?.content));
};

export const fetchProjeto = (projetoId) => async (dispatch) => {
  const response = await projetoAPI.getById(projetoId);
  const projeto = response.data;
  dispatch(addedProjeto(projeto));
};

export const saveProjeto = (projeto) => async (dispatch, getState) => {
  // TODO tratar rejection
  const response = await projetoAPI.save(projeto);
  const newProjeto = { ...projeto };
  newProjeto.id = response.data;
  newProjeto.nomeCliente = clienteSelectors.selectById(getState(), newProjeto.clienteId).nome;
  dispatch(addedProjeto(newProjeto));
};

export const { addedProjeto, addedProjetos } = projetoSlice.actions;

export default projetoSlice;
