import Axios from "axios";

const bancoAPI = {
  getAll: async () => {
    const { data } = await Axios.get("/bancos");
    return data;
  },
};

export default bancoAPI;
