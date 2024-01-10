import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as authEndpoints from '../../endpoints/auth';
import * as authResponses from '../../interfaces/auth-responses';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient = inject(HttpClient);

  refreshToken() {
	  return this._httpClient.get<authResponses.ITokens>(authEndpoints.REFRESH);
  }

  register(email: string, password: string) {
	  return this._httpClient.post<authResponses.ITokens>(authEndpoints.REGISTER, { email, password });
  }

  login(email: string, password: string) {
	  return this._httpClient.post<authResponses.ITokens>(authEndpoints.LOGIN, { email, password });
  }
}
