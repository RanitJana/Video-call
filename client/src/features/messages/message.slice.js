import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "Floating emoji",
  initialState: [
    // {
    //   sender: {
    //     name: "Ranit Jana",
    //     id: Date.now(),
    //   },
    //   message: "Hey there! welcome to my video call app! I hope you like it",
    //   time: Date.now(),
    // },
  ],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
