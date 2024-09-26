import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'demo-app-edit',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditComponent {
  @Input() studentData: any;
  ngOnInit() {
    console.log('Received student data:', this.studentData);
  }
}
