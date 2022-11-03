import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import sensorReducer from "../features/sensors/sensorsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    sensors: sensorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
