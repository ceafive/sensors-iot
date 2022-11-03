import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sensorsWorker } from "../../App";
import { CommandPayload, SensorInterface, SensorsState } from "../interfaces";

const initialState: SensorsState = {};

export const socket = new WebSocket("ws://localhost:5000");

export const fetchSensorsAsync = createAsyncThunk(
  "app/sensors",
  (_, { dispatch }) => {
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data) as SensorInterface;
      sensorsWorker.postMessage(data);
      // dispatch(setSensors(data));
    };
  }
);

export const sensorSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    setSensors(state, action: PayloadAction<SensorInterface>) {
      state[action.payload.id] = action.payload;
    },
    toggleSensor(_, action: PayloadAction<CommandPayload>) {
      socket.send(JSON.stringify(action.payload));
    },
  },
});

export const { setSensors, toggleSensor } = sensorSlice.actions;

export default sensorSlice.reducer;
