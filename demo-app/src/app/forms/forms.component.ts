import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'demo-app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsComponent {
  form!: FormGroup;
  // private dialogRef = inject(MatDialogRef<FormsComponent>);
  @Input() initialData: any;
  constructor() {
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]*([ ]+[A-Za-z]*)*$'), Validators.minLength(3)]),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(25)]),
      address: new FormControl('',[ Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('',[ Validators.required,Validators.pattern('^\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4}$')]),
      courses: new FormControl('', Validators.required),
      gpa: new FormControl('', [Validators.required, Validators.min(0), Validators.max(4)])
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
    console.log('Form valid:', this.form.valid);
    console.log('Form errors:', this.form.errors);
    console.log('Form value:', this.form.value);
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
