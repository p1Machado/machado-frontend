import Axios from "axios";

const orcamentoAPI = {
  save: (orcamento) => {
    return Axios.post("/orcamentos", orcamento);
  },
  getById: async (orcamentoId) => {
    const { data } = await Axios.get("/orcamentos/" + orcamentoId);
    return data;
  },
  getAllByProjetoId: async (projetoId) => {
    const { data } = await Axios.get("/projetos/" + projetoId + "/orcamentos");
    return data;
  },
};

export default orcamentoAPI;
