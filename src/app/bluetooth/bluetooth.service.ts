import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private commandCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private _isConnected: boolean = false;

  constructor() {}
  
  async connect() {
    if (!("bluetooth" in navigator)) {
      alert("Web Bluetooth API is not available.");
      return;
    }

    try {
      this.device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: []
      });

      if (!this.device.gatt) {
        alert("Failed to connect to Bluetooth device.");
        return;
      }

      this.server = await this.device.gatt.connect();
      this._isConnected = true;
      
      if (!this.server) {
        alert("Failed to connect to Bluetooth device.");
        return;
      }

      const services = await this.server?.getPrimaryServices();

      for (const service of services) {
        const characteristics = await service.getCharacteristics();
        for (const characteristic of characteristics) {
          const descriptors = await characteristic.getDescriptors();
          for (const descriptor of descriptors) {
            await descriptor.readValue();
            const name = new TextDecoder().decode(await descriptor.readValue());
            if (name === 'command') {
              this.commandCharacteristic = characteristic;
            }
          }
        }
      }

      if (!this.commandCharacteristic) {
        alert("Failed to find command characteristic.");
        return;
      }    
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendCommand(command: string) {
    if (!this.commandCharacteristic) {
      return;
    }
    await this.commandCharacteristic.writeValue(new TextEncoder().encode(command));
  }  

  disconnect() {
    if (this.server) {
      this.server.disconnect();
      this._isConnected = false;
    }
  }

  isConnected() {
    return this._isConnected;
  }
}