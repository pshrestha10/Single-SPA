import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import '@en-text-field';
import { Students } from '../students.services';

@Component({
  selector: 'demo-app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsComponent {
  additionForm: FormGroup;
  @Input() initialData: any;

  constructor(private studentsService: Students, private router: Router) {
    this.additionForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]*([ ]+[A-Za-z]*)*$'), Validators.minLength(3)]),
      gender: new FormControl('', Validators.required),
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

  onSubmit(): void {
    if (this.additionForm.valid) {
      const formValue = this.additionForm.value;
      this.studentsService.addStudent(formValue); 
      console.log('Form submitted:', formValue);
      window.location.reload();
    } else {
      this.additionForm.markAllAsTouched();
    }
  }

  checkIfValidStudent() {
    const studentId = this.additionForm.get('id');
    console.log(studentId?.dirty, studentId?.hasError('required'), studentId?.hasError('maxlength'), studentId?.hasError('minlength'));
  //   return (
  //     clientIdField?.dirty &&
  //     (clientIdField?.hasError('required') ||
  //       clientIdField.hasError('maxlength') ||
  //       clientIdField.hasError('minlength'))
  //   );
  return false;
  }
}
