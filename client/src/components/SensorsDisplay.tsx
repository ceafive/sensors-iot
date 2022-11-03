import { memo } from "react";
import { useAppSelector } from "../app/hooks";
import SensorCard from "./SensorCard";
import { isEqual } from "lodash";

const SensorsDisplay = () => {
  let sensors = useAppSelector((state) => state.sensors, isEqual);

  let showConnected = useAppSelector(
    (state) => state.app.showConnected,
    isEqual
  );

  let connectedSensors = Object.entries(sensors).filter(([_, value]) => {
    if (showConnected) {
      return value.connected;
    }

    return true;
  });

  return (
    <div
      data-testid="sensors-display"
      className="mt-5 p-[18px] grid w-full grid-cols-3 gap-[12px] containter mx-auto"
    >
      {connectedSensors?.map(([key, sensor]) => {
        return <SensorCard key={key} sensor={sensor} />;
      })}
    </div>
  );
};

export default memo(SensorsDisplay);
