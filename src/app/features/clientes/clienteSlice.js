import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import clienteAPI from "app/api/clienteAPI";

const clienteAdapter = createEntityAdapter({ sortComparer: (a, b) => a.nome > b.nome });

const clienteSlice = createSlice({
  name: "cliente",
  initialState: clienteAdapter.getInitialState(),
  reducers: {
    addedCliente: clienteAdapter.addOne,
    updatedCliente: clienteAdapter.updateOne,
    addedClientes: clienteAdapter.addMany,
    removedCliente: clienteAdapter.removeOne,
  },
});

export const clienteSelectors = clienteAdapter.getSelectors((state) => state[clienteSlice.name]);

export const fetchClientes = () => async (dispatch) => {
  const response = await clienteAPI.getAll();
  dispatch(addedClientes(response));
};

export const saveCliente = (cliente) => async (dispatch) => {
  const response = await clienteAPI.save(cliente);
  const newCliente = { ...cliente };
  newCliente.id = Number(response.data);
  dispatch(addedCliente(newCliente));
};

export const updateCliente = (cliente) => async (dispatch) => {
  await clienteAPI.save(cliente);
  dispatch(updatedCliente({ id: cliente.id, changes: cliente }));
};

export const deleteCliente = (clienteId) => async (dispatch) => {
  await clienteAPI.delete(clienteId);
  dispatch(removedCliente(clienteId));
};

export const { addedCliente, updatedCliente, addedClientes, removedCliente } = clienteSlice.actions;

export default clienteSlice;
