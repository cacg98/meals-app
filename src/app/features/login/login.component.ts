import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { AuthService } from '../../common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  private authSerive = inject(AuthService)

  profileForm = this.formBuilder.nonNullable.group({
    email: ['cacg98@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required]
  })

  get email() {
    return this.profileForm.get('email')
  }

  get password() {
    return this.profileForm.get('password')
  }

  isSignUp: boolean = true

  onSubmit() {
    const { email, password } = this.profileForm.value

    const observable = this.isSignUp ? 
      this.authSerive.register(email!, password!) :
      this.authSerive.login(email!, password!)

    observable.subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getErrorMessage() {
    if (this.email!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email!.hasError('email') ? 'Not a valid email' : '';
  }
}
