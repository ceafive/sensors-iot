import { cloneElement } from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";

import { act } from "react-dom/test-utils";
import { setShowConnected } from "../features/app/appSlice";
import WS from "jest-websocket-mock";
import { store } from "../app/store";
import App from "../App";
import Toggle from "../components/Toggle";
import Header from "../components/Header";
import { CommandPayload } from "../features/interfaces";
import { setSensors } from "../features/sensors/sensorsSlice";

afterEach(() => {
  cleanup();
});

const renderApp = (Component: any, props?: any): RenderResult => {
  const clonedElement = cloneElement(<Component />, props);
  return render(<Provider store={store}>{clonedElement}</Provider>);
};

describe("test react components", () => {
  test("renders whole header", () => {
    renderApp(Header);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toHaveTextContent(
      "Sensors Management"
    );
    expect(screen.getByTestId("header")).toHaveTextContent("Show all");
  });

  test("renders toggle box", () => {
    renderApp(Toggle, { text: "Show some" });
    expect(screen.getByTestId("toggle-box")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-box")).toHaveTextContent("Show some");

    let toggleButton = screen.getByTestId("toggle");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.change(toggleButton, { target: { checked: true } });
    expect(toggleButton).toBeChecked();

    act(() => {
      store.dispatch(setShowConnected(true));
    });

    expect(screen.getByTestId("toggle-dot")).toHaveClass(
      "translate-x-full bg-green-500"
    );

    act(() => {
      store.dispatch(setShowConnected(false));
    });

    expect(screen.getByTestId("toggle-dot")).not.toHaveClass(
      "translate-x-full bg-green-500"
    );
  });

  describe("The SensorsDisplay", () => {
    let server: WS;
    let client: WebSocket;

    let serverMessages = [
      { id: "0", name: "Wind", connected: false, unit: "m/s", value: null },
      { id: "1", name: "Temperature", connected: true, unit: "C", value: "10" },
    ];

    beforeEach(async () => {
      server = new WS("ws://localhost:5000", { jsonProtocol: true });
      client = new WebSocket("ws://localhost:5000");
      await server.connected;
    });

    afterEach(() => {
      WS.clean();
      cleanup();
    });

    test("the server keeps track of received messages, and yields them as they come in", async () => {
      let clientMessage: CommandPayload = { id: "0", command: "connect" };
      client.send(JSON.stringify(clientMessage));

      await expect(server).toReceiveMessage(clientMessage);
      expect(server).toHaveReceivedMessages([clientMessage]);
    });

    it("renders cards", async () => {
      renderApp(App);

      expect(screen.queryByTestId("sensor-card-0")).not.toBeInTheDocument();
      act(() => {
        for (let serverMessage of serverMessages) {
          store.dispatch(setSensors(serverMessage));
        }
      });

      expect(screen.getByTestId("sensors-display")).toBeInTheDocument();
      expect(screen.getByTestId("sensor-card-0")).toBeInTheDocument();
      expect(screen.getByTestId("sensor-card-0")).toHaveTextContent("Wind");
    });

    it("renders only connected", async () => {
      renderApp(App);

      act(() => {
        store.dispatch(setShowConnected(true));
      });

      expect(screen.getByTestId("sensors-display")).toBeInTheDocument();
      expect(screen.queryByTestId("sensor-card-0")).not.toBeInTheDocument();
    });
  });
});
