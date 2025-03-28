import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "../features/ToggleMedia/toggle.slice.js";
import authSlice from "../features/auth/auth.slice.js";
import floatingEmoji from "../features/floatingEmoji/floatingEmoji.slice.js";
import drawerSlice from "../features/drawerOpen/drawer.slice.js";
import messageSlice from "../features/messages/message.slice.js";

export const store = configureStore({
  reducer: {
    toogle: toogleSlice,
    auth: authSlice,
    floatingEmoji,
    drawer: drawerSlice,
    messages: messageSlice,
  },
});
