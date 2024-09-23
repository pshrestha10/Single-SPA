import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsComponent } from "../forms/forms.component";

@Component({
  selector: 'demo-app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsComponent]

})
export class DialogComponent {

}
