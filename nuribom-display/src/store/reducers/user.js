import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      data: null,
    },
  },
  reducers: {
    storeUserRegist: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeUserRegist } = userSlice.actions;
export default userSlice.reducer;
