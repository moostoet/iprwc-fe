import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ButtonModule, ReactiveFormsModule, MessageModule, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  success?: boolean;
  error?: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;
    console.log('Login data:', loginData);
    this.authService.login(loginData).subscribe({
      next: response => {
        console.log('Login response:', response);
        this.error = false;
        this.success = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: error => {
        console.log('Login error:', error);
        this.success = false;
        this.error = true;
      }
    });
  }
}