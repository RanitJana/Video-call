import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    data: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.data = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
