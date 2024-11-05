import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for common directives like *ngIf and *ngFor
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with validation rules
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }
  
    , {
      validators: this.passwordMatchValidator // Custom validator for password matching
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const { firstName,lastName, username, email, password, confirmPassword } = this.registrationForm.value;
    console.log('Form Values:', this.registrationForm.value);

    this.authService.register(firstName, lastName, username, email, password, confirmPassword).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // window.alert("User added succesfully")
        this.router.navigate(["/login"])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
