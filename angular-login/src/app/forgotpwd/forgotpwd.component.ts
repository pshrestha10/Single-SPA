import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-login-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgotpwdComponent {
  resetPwd: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPwd = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    const storedData = JSON.parse(localStorage.getItem('signupData') || '[]');
    if (storedData) {
      storedData.password = this.resetPwd.get('password')?.value;
      localStorage.setItem('signupData', JSON.stringify(storedData));
      this.router.navigate(['/login']);
    } 
  }
}
