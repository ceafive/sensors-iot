import appReducer, {
  initialState,
  setShowConnected,
} from "../features/app/appSlice";

describe("app reducer", () => {
  it("should handle initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setShowConnected set to true", () => {
    const actual = appReducer(initialState, setShowConnected(true));
    expect(actual.showConnected).toEqual(true);
  });

  it("should handle setShowConnected set to false", () => {
    const actual = appReducer(initialState, setShowConnected(false));
    expect(actual.showConnected).toEqual(false);
  });
});
