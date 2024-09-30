import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import '@en-text-field';
import { Students } from '../students.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsComponent {
  additionForm: FormGroup;
  @Input() initialData: any;

  constructor(private studentsService: Students, private router: Router) {
    this.additionForm = new FormGroup({
      // id: new FormControl('', [Validators.required , Validators.pattern('^[0-9]*$')]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]*([ ]+[A-Za-z]*)*$'), Validators.minLength(3)]),
      gender: new FormControl(''),
      age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(25)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4}$')]),
      courses: new FormControl('', Validators.required),
      gpa: new FormControl('', [Validators.required, Validators.min(0), Validators.max(4)])
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      const address = this.initialData.address;
      const addr = address.street + " " + address.city + " " + address.zip + " " + address.country;
      if (address && typeof address === 'object') {
        this.initialData.address = addr;
      }
      this.additionForm.patchValue(this.initialData);
    }
  }

  private generateUniqueId(): number {
    const currentStudents = JSON.parse(localStorage.getItem('studentsData') || '[]');
    const existingIds = currentStudents.map((student: any) => student.id);

    if (existingIds.length === 0) {
      return 1;
    }

    const maxId = Math.max(...existingIds);
    return maxId + 1;
  }

  onSubmit(): void {
    if (this.additionForm.valid) {
      const formValue = {
        ...this.additionForm.value,
        id: this.generateUniqueId() // Automatically generate the ID
      };
      this.studentsService.addStudent(formValue);
      console.log('Form submitted:', formValue);
      window.location.reload();
    } else {
      this.additionForm.markAllAsTouched();
      console.log('Form submitted:', this.additionForm.valid);
    }
  }
}
