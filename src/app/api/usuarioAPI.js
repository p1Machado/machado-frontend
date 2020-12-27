import Axios from "axios";

const usuarioAPI = {
  getCurrentUser: () => {
    return Axios.get("/me", { baseURL: "/", maxRedirects: 0 });
  },
};

export default usuarioAPI;
