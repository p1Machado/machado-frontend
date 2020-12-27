import Axios from "axios";

const projetoAPI = {
  getPage: async (page, size) => {
    return await Axios.get("/projetos", { params: { page, size } });
  },
  getById: async (projetoId) => {
    return Axios.get("/projetos/" + projetoId);
  },
  save: async (projeto) => {
    return Axios.post("/projetos", projeto);
  },
};

export default projetoAPI;
