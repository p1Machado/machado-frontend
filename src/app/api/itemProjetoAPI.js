import Axios from "axios";

const itemProjetoAPI = {
  save: (projetoId, itemProjeto) => {
    return Axios.post("/projetos/" + projetoId + "/itens-projeto", itemProjeto);
  },
  update: (projetoId, itemProjeto) => {
    return Axios.put("/projetos/" + projetoId + "/itens-projeto/" + itemProjeto.id, itemProjeto);
  },
};

export default itemProjetoAPI;
