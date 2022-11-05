import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import Header from "./components/Header";
import SensorsDisplay from "./components/SensorsDisplay";
import { fetchSensorsAsync, setSensors } from "./features/sensors/sensorsSlice";
const sensorsWorker: Worker = new Worker("./workers/worker.js");

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSensorsAsync());

    sensorsWorker.onmessage = (event: MessageEvent) => {
      const { data } = event;
      dispatch(setSensors(data));
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <SensorsDisplay />
    </>
  );
}

export { sensorsWorker };
export default App;
