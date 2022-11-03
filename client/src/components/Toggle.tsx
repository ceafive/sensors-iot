import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setShowConnected } from "../features/app/appSlice";
import { isEqual } from "lodash";

interface Props {
  text: string;
}

const Toggle = ({ text }: Props) => {
  const dispatch = useAppDispatch();
  const showConnected = useAppSelector(
    (state) => state.app.showConnected,
    isEqual
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowConnected(e.target.checked));
  };

  return (
    <label
      data-testid="toggle-box"
      htmlFor="show-connected"
      className="flex items-center"
    >
      <p className="mr-3">{text}</p>
      <div className="relative cursor-pointer">
        <input
          data-testid="toggle"
          id="show-connected"
          checked={showConnected}
          onChange={handleChange}
          type="checkbox"
          className="sr-only"
        />
        <div className="block bg-transparent border border-gray-400 w-12 h-7 rounded-full" />
        <div
          data-testid="toggle-dot"
          className={`dot absolute left-1 top-1 border border-gray-400 w-5 h-5 rounded-full transition-all ${
            showConnected ? "translate-x-full bg-green-500" : "bg-transparent"
          }`}
        />
      </div>
    </label>
  );
};

export default Toggle;
