export interface DeviceConfig {
  mode: 'manual' | 'adaptive' | 'ai';
  aiEnabled?: boolean;
  sensitivity?: number;
}

export interface SessionOptions {
  intensity: number;
  pattern: 'wave' | 'pulse' | 'random' | 'sync';
  duration?: number;
}

export interface DeviceStatus {
  connected: boolean;
  battery: number;
  signal: number;
}
