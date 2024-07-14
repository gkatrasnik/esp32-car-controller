import { Component } from '@angular/core';
import { BluetoothService } from '../../bluetooth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-car-control',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './car-control.component.html',
  styleUrl: './car-control.component.scss'
})
export class CarControlComponent {
  _isConnectedToDevice: boolean = false;

  constructor(private bluetoothService: BluetoothService) { }

  async sendCommand(command: string) {
    try {
      await this.bluetoothService.sendCommand(command);
      console.log('Command sent', command);
    } catch (error) {
      console.error(error);
    }
  }

  
}
