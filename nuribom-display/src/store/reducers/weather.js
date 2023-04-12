import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    value: {
      sky: "1",
      pop: "0"
    },
  },
  reducers: {
    storeWeatherRegist: (state, action) => {
      state.value = action.payload;
      console.log("durl dhTek")
    },
  },
});

export const { storeWeatherRegist } = weatherSlice.actions;
export default weatherSlice.reducer;
