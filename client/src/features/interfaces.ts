export interface SensorInterface {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}

export interface CommandPayload {
  id: string;
  command: "disconnect" | "connect";
}

export interface AppState {
  showConnected: boolean;
}

export type SensorsState = { [key: string]: SensorInterface };
