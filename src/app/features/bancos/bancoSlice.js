import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import bancoAPI from "app/api/bancoAPI";

const bancoAdapter = createEntityAdapter({ sortComparer: (a, b) => a.compe > b.compe });

const bancoSlice = createSlice({
  name: "banco",
  initialState: bancoAdapter.getInitialState(),
  reducers: {
    addedBancos: bancoAdapter.addMany,
  },
});

export const bancoSelectors = bancoAdapter.getSelectors((state) => state[bancoSlice.name]);

export const fetchBancos = () => async (dispatch) => {
  dispatch(addedBancos(await bancoAPI.getAll()));
};

export const { addedBancos } = bancoSlice.actions;

export default bancoSlice;
