import Axios from "axios";

const fornecedorAPI = {
  getAll: async () => {
    const { data } = await Axios.get("/fornecedores");
    return data;
  },
  getAllByProjetoId: async (projetoId) => {
    const { data } = await Axios.get("/projetos/" + projetoId + "/fornecedores");
    return data;
  },
  save: (fornecedor) => {
    return Axios.post("/fornecedores", fornecedor);
  },
  update: (fornecedor) => {
    return Axios.put("/fornecedores/" + fornecedor.id, fornecedor);
  },
};

export default fornecedorAPI;
