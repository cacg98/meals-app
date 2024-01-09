import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  private authSerive = inject(AuthService)

  profileForm = this.formBuilder.nonNullable.group({
    email: ['cacg98@gmail.com', Validators.required],
    password: ['123456', Validators.required]
  })

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
}
