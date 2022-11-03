import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import Header from "./components/Header";
import SensorsDisplay from "./components/SensorsDisplay";
import { fetchSensorsAsync } from "./features/sensors/sensorsSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSensorsAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <SensorsDisplay />
    </>
  );
}

export default App;
