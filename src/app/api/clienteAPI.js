import Axios from "axios";

const clienteAPI = {
  getAll: async () => {
    const { data } = await Axios.get("/clientes");
    return data;
  },
  save: (cliente) => {
    return Axios.post("/clientes", cliente);
  },
  delete: (clienteId) => {
    return Axios.delete("/clientes/" + clienteId);
  },
};

export default clienteAPI;
