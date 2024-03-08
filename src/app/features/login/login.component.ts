import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../common/services/auth/auth.service';
import { AuthTokensService } from '../../common/services/auth-tokens/auth-tokens.service';
import { StateService } from '../../common/services/state/state.service';
import { LoaderService } from '../../common/services/loader/loader.service';
import { RecordsService } from '../../common/services/records/records.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authSerive = inject(AuthService);
  private authTokensSerive = inject(AuthTokensService);
  private router = inject(Router);
  private stateService = inject(StateService);
  private snackBarService = inject(MatSnackBar);
  private loaderService = inject(LoaderService);
  private recordsService = inject(RecordsService);

  profileForm = this.formBuilder.nonNullable.group({
    email: [
      'cacg98@gmail.com',
      [
        Validators.required,
        // custom email validator
        (control: AbstractControl): ValidationErrors | null => {
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value);
          return isValid ? null : { errorEmail: { value: control.value } };
        },
      ],
    ],
    password: ['123456', Validators.required],
  });

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get loading(): boolean {
    return this.loaderService.loading;
  }

  isSignUp: boolean = false;
  hide: boolean = true;

  apiErrors: Record<string, string> = {
    'Email already used': 'Ya existe un usuario con este correo electrónico',
    'Wrong email or password': 'Correo electrónico o contraseña equivocada',
  };

  onSubmit() {
    this.loaderService.showSpinner();

    const { email, password } = this.profileForm.value;

    const observable = this.isSignUp
      ? this.authSerive.register(email!, password!)
      : this.authSerive.login(email!, password!);

    observable.subscribe({
      next: (res: any) => {
        if (this.isSignUp) {
          this.snackBarService.open(
            'Registro exitoso. Inicie sesión ahora',
            undefined,
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
          this.isSignUp = false;
        } else {
          this.authTokensSerive.updateTokens(res.accessToken, res.refreshToken);
          this.stateService.resetState();
          this.router.navigateByUrl('home');
          this.recordsService.list().subscribe({
            next: (res) => {
              this.stateService.records.set(res.data);
              this.stateService.totalRecords.set(res.count);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
        this.loaderService.hideSpinner();
      },
      error: (err) => {
        this.snackBarService.open(
          this.apiErrors[err.error.message],
          undefined,
          {
            duration: 5000,
            verticalPosition: 'top',
          }
        );
        this.loaderService.hideSpinner();
      },
    });
  }

  getErrorMessage() {
    if (this.email!.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.email!.hasError('errorEmail') ? 'Correo electrónico inválido' : '';
  }

  changeForm() {
    if (this.isSignUp) {
      this.profileForm.setValue({ email: '', password: '' });
    } else {
      this.profileForm.reset();
    }
  }
}
