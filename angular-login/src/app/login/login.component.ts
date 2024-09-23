import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'angular-login-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm: FormGroup;
  loginError: string | null = null; 
  showForgotPasswordLink: boolean = false; 

  constructor(private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    const storedData = JSON.parse(localStorage.getItem('signupData') || 'null');
    console.log(storedData)
    console.log(storedData.email, storedData.password, password, email)
    if (storedData) {
      if (storedData.email === email) {
        if (storedData.password === password) {
          console.log('Login successful');
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Wrong password';
          this.showForgotPasswordLink = true;
        }
      } else {
        this.loginError = 'Invalid email Sign up.';
        this.showForgotPasswordLink = false;
      }
    } else {
      this.loginError = 'No user Sign up.';
      this.showForgotPasswordLink = false;
    }
  }

  get emailControl(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
