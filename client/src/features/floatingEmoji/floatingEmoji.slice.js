import { createSlice, nanoid } from "@reduxjs/toolkit";

const floatingEmoji = createSlice({
  name: "Floating emoji",
  initialState: [],
  reducers: {
    addEmoji: (state, action) => {
      if (state.length > 1) state.shift();
      const newEmoji = { ...action.payload, id: nanoid() }; // Create a new object
      state.push(newEmoji);
    },
  },
});

export const { addEmoji } = floatingEmoji.actions;

export default floatingEmoji.reducer;
