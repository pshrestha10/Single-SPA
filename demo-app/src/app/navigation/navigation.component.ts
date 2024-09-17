import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'demo-app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ChartsComponent]
})
export class NavigationComponent {

}
