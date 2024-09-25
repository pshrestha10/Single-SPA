import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-login-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, ReactiveFormsModule, CommonModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  emailExists: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      security: [''],
      answer: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator }); 
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Valid:', this.signupForm.valid);
      const existingData = JSON.parse(localStorage.getItem('signupData') || 'null');

      if (existingData && existingData.email === this.signupForm.value.email) {
        this.emailExists = true;
      } else {
        this.emailExists = false;
        localStorage.setItem('signupData', JSON.stringify(this.signupForm.value));
        this.router.navigate(['/login']);
      }
    } else {
      console.log('Form is invalid', this.signupForm.errors);
    }
  }
}
