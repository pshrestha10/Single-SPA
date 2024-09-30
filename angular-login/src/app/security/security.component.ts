import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-login-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurityComponent implements OnInit {
  securityForm: FormGroup;
  securityQuestion: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {
    this.securityForm = new FormGroup({
      securityAnswer: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const signupData = localStorage.getItem('signupData');
    if (signupData) {
      const parsedData = JSON.parse(signupData);
      this.securityQuestion = parsedData.security;
      console.log(this.securityQuestion)
    }
  }

  onSubmit(): void {
    const userInput = this.securityForm.get('securityAnswer')?.value;
    console.log(userInput);
    const signupData = localStorage.getItem('signupData');
    if (signupData) {
      const parsedData = JSON.parse(signupData);
      const correctAnswer = parsedData.answer; 
      if (userInput === correctAnswer) {
        this.router.navigate(['/forgotpwd']);
      } else {
        this.errorMessage = 'Wrong answer. Please try again.';
      }
    }
  }
}
