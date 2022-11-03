import { memo, useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { CommandPayload, SensorInterface } from "../features/interfaces";
import { toggleSensor } from "../features/sensors/sensorsSlice";

const SensorCard = ({ sensor }: { sensor: SensorInterface }) => {
  const dispatch = useAppDispatch();

  const onToggleSensor = useCallback(() => {
    const payload: CommandPayload = {
      command: sensor.connected ? "disconnect" : "connect",
      id: sensor.id,
    };
    dispatch(toggleSensor(payload));
  }, [dispatch, sensor.connected, sensor.id]);

  return (
    <div
      data-testid={`sensor-card-${sensor.id}`}
      className="border border-[#ecf0f1] flex flex-col p-[6px] rounded-lg"
    >
      <div className="flex font-bold justify-center items-center">
        {sensor.name}
      </div>
      <div className="flex-grow flex justify-center items-center">
        {sensor.connected ? `${sensor.value} ${sensor.unit}` : "Disconnected"}
      </div>

      <button
        onClick={onToggleSensor}
        className={`w-full h-[36px] flex items-center justify-center text-inherit border-none ${
          !sensor.connected
            ? "bg-green-500 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-700"
        }  transition-all rounded-[3px] text-white cursor-pointer `}
      >
        {sensor.connected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default memo(SensorCard);
