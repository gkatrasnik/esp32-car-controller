import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private commandCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private _isConnected: boolean = false;

  private deviceName ='ESP32-Car';
  private bleServiceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  private commandCharacteristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

  constructor() {}
  
  async connect() {
    if (!("bluetooth" in navigator)) {
      alert("Web Bluetooth API is not available.");
      return;
    }
  
    try {
      // Request the specific device by name and service UUID
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: this.deviceName }],
        optionalServices: [this.bleServiceUUID]
      });
  
      if (!this.device.gatt) {
        alert("Failed to connect to Bluetooth device.");
        return;
      }
  
      this.server = await this.device.gatt.connect();
      this._isConnected = true;
  
      // Get the specified service by UUID
      const service = await this.server.getPrimaryService(this.bleServiceUUID);
  
      // Get the command characteristic by UUID
      this.commandCharacteristic = await service.getCharacteristic(this.commandCharacteristicUUID);
  
      if (!this.commandCharacteristic) {
        alert("Failed to find command characteristic.");
        return;
      }
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
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