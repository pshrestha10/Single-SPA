import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '../forms/forms.component';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'demo-app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})
export class DashboardComponent {

}
