import React, { memo } from "react";
import { useAppDispatch } from "../app/hooks";
import { setShowConnected } from "../features/app/appSlice";
import Toggle from "./Toggle";

const Header = () => {
  const dispatch = useAppDispatch();

  const onShowAll = () => {
    dispatch(setShowConnected(false));
  };

  return (
    <header
      data-testid="header"
      className="flex justify-between items-center p-2 bg-gray-300 h-[70px] text-gray-700"
    >
      <h1>Sensors Management</h1>
      <div className="flex items-center">
        <Toggle text="Show connected" />
        <button onClick={onShowAll} className="ml-3">
          Show all
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
