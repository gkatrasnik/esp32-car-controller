import { Component } from '@angular/core';
import  { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BluetoothService } from '../../bluetooth.service';

@Component({
  selector: 'app-connectivity',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './connectivity.component.html',
  styleUrl: './connectivity.component.scss'
})
export class ConnectivityComponent {

  _isConnectedToDevice: boolean = false;
  
  constructor(private bluetoothService: BluetoothService) { }

  async connect() {
    try {
      await this.bluetoothService.connect();
      this.updateConnectionStatus();
      console.log('Connected');
    } catch (error) {
      console.error(error);
    }
  }

  disconnect() {
    try {
      this.bluetoothService.disconnect();
      this.updateConnectionStatus();
      console.log('Disconnected');
    } catch (error) {
      console.error(error);
    }
  }

  updateConnectionStatus() {
    this._isConnectedToDevice = this.bluetoothService.isConnected();
    console.log('Is device connected?', this._isConnectedToDevice);
  }

}
