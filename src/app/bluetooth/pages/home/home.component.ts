import { Component } from '@angular/core';
import { CarControlComponent } from '../../components/car-control/car-control.component';
import { ConnectivityComponent } from '../../components/connectivity/connectivity.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarControlComponent, ConnectivityComponent, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
