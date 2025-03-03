import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { SignupService } from '../../../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  // Include all necessary modules if using Angular Standalone components.
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, MessageModule],
  standalone: true
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  success?: boolean;
  error?: boolean;

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue] // Must be checked!
      },
      {
        validators: this.mustMatch('password', 'confirmPassword')
      }
    );
  }

  mustMatch(pw: string, pwMatch: string) {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(pw);
      const matchingControl = abstractControl.get(pwMatch);
      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }
      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  // Handy getter for easy access to form controls in the template.
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  
  // Called when the user submits the signup form.
  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    
    // Remove confirmPassword before sending to backend if needed.
    const { confirmPassword, ...signupData } = this.signupForm.value;
    
    // Call the service to register the user.
    this.signupService.register(signupData).subscribe({
      next: response => {
        console.log('Registration successful!', response);
        this.error = false;
        this.success = true;
      },
      error: error => {
        console.error('Registration error', error);
        this.success = false;
        this.error = true;
      }
    });
  }
}