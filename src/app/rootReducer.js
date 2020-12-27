import { combineReducers } from "@reduxjs/toolkit";

import bancoSlice from "app/features/bancos/bancoSlice";
import clienteSlice from "app/features/clientes/clienteSlice";
import fornecedorSlice from "app/features/fornecedores/fornecedorSlice";
import orcamentoSlice from "app/features/orcamentos/orcamentoSlice";
import projetoSlice from "app/features/projetos/projetoSlice";
import itemProjetoSlice from "app/features/itensProjeto/itemProjetoSlice";
import itemOrcamentoSlice from "app/features/itensOrcamento/itemOrcamentoSlice";

const rootReducer = combineReducers({
  [bancoSlice.name]: bancoSlice.reducer,
  [clienteSlice.name]: clienteSlice.reducer,
  [fornecedorSlice.name]: fornecedorSlice.reducer,
  [orcamentoSlice.name]: orcamentoSlice.reducer,
  [projetoSlice.name]: projetoSlice.reducer,
  [itemProjetoSlice.name]: itemProjetoSlice.reducer,
  [itemOrcamentoSlice.name]: itemOrcamentoSlice.reducer,
});

export default rootReducer;
