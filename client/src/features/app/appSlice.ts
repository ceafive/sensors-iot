import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../interfaces";

export const initialState: AppState = {
  showConnected: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowConnected(state, action: PayloadAction<boolean>) {
      state.showConnected = action.payload;
    },
  },
});

export const { setShowConnected } = appSlice.actions;

export default appSlice.reducer;
