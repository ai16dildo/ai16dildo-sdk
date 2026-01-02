import { EventEmitter } from '../events/EventEmitter';

export class BluetoothManager extends EventEmitter {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private isConnected = false;

  async connect(): Promise<boolean> {
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }],
        optionalServices: ['generic_access']
      });

      const server = await this.device.gatt?.connect();
      if (!server) throw new Error('Failed to connect to GATT server');

      this.isConnected = true;
      this.emit('connected', this.device);

      this.device.addEventListener('gattserverdisconnected', () => {
        this.isConnected = false;
        this.emit('disconnected');
      });

      return true;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.isConnected = false;
    this.device = null;
  }

  async sendCommand(command: Uint8Array): Promise<void> {
    if (!this.characteristic) {
      throw new Error('No characteristic available');
    }
    await this.characteristic.writeValue(command.buffer as ArrayBuffer);
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}
