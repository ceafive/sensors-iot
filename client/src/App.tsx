import { useEffect, useRef } from "react";
import { useAppDispatch } from "./app/hooks";
import Header from "./components/Header";
import SensorsDisplay from "./components/SensorsDisplay";
import { SensorInterface } from "./features/interfaces";
import {
  fetchSensorsAsync,
  setSensors,
  socket,
} from "./features/sensors/sensorsSlice";

function App() {
  const wsRef = useRef<WebSocket>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchSensorsAsync());

    const ws = socket;
    ws.onopen = () => {
      console.log("onopen");
    };
    ws.onclose = () => console.log("onclose");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data) as SensorInterface;
      dispatch(setSensors(data));
    };
    wsRef.current = ws;
  }, [dispatch]);

  return (
    <>
      <Header />
      <SensorsDisplay />
    </>
  );
}

export default App;
