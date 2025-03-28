import { createSlice } from "@reduxjs/toolkit";

const floatingEmoji = createSlice({
  name: "Floating emoji",
  initialState: [],
  reducers: {
    addEmoji: (state, action) => {
      state.push(action.payload);
    },
    removeFirstEmoji: (state) => {
      if (state.length) state.shift();
    },
  },
});

export const { addEmoji, removeFirstEmoji } = floatingEmoji.actions;

export default floatingEmoji.reducer;
