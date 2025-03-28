import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "Drawer",
  initialState: {
    isOpen: false,
    barType: null,
  },
  reducers: {
    toggleDrawer: (state, action) => {
      if (action.payload == state.barType) {
        state.barType = null;
        state.isOpen = false;
      } else {
        state.barType = action.payload;
        state.isOpen = true;
      }
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
