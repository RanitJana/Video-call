import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "Toggle media",
  initialState: {
    audio: true,
    video: true,
  },
  reducers: {
    updateMedia: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { updateMedia } = toggleSlice.actions;

export default toggleSlice.reducer;
