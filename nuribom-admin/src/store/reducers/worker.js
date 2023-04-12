import { createSlice } from "@reduxjs/toolkit";

export const workerSlice = createSlice({
  name: "worker",
  initialState: {
    value: {
      isLogin: false,
      data: null,
    },
  },
  reducers: {
    storeWorkerLogin: (state, action) => {
      state.value = action.payload;
    },
    storeWorkerLogout: (state, action) => {
      state.value = {
        isLogin: false,
        data: null,
      };
      sessionStorage.removeItem("ACCESS_TOKEN");
      // sessionStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("jwt");
    },
  },
});

export const { storeWorkerLogin, storeWorkerLogout } = workerSlice.actions;
export default workerSlice.reducer;
