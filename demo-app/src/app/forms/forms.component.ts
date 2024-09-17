import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'demo-app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsComponent {
  fb = inject(FormBuilder);
  form: FormGroup;
  // private dialogRef = inject(MatDialogRef<FormsComponent>);
  @Input() initialData: any;
  constructor() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]*([ ]+[A-Za-z]*)*$'), Validators.minLength(3)]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(25)]],
      address: ['',[ Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[ Validators.required,Validators.pattern('^\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4}$')]],
      courses: ['', Validators.required],
      gpa: ['', [Validators.required, Validators.min(0), Validators.max(4)]]
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      console.log(this.initialData);
      const address = this.initialData.address;
      const addr = address.street + " " + address.city + " " + address.zip + " " + address.country;
      console.log(addr);
      if (address && typeof address === 'object') {
        this.initialData.address = addr;
      }
      this.form.patchValue(this.initialData);  
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const formValue = this.form.value;
      // this.dialogRef.close(formValue);
      console.log('Form data appended to local storage:', formValue)
      
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }
}
