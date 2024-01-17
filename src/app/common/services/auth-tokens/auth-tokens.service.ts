import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as authEndpoints from '../../endpoints/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthTokensService {

  	private _isRefreshing: boolean = false;

	get isRefreshing() {
		return this._isRefreshing;
	}
	set isRefreshing(value) {
		this._isRefreshing = value;
	}

	addAuthorizationHeader(req: HttpRequest<unknown>) {
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refreshToken');
		const token = req.url === authEndpoints.REFRESH_TOKEN ? refreshToken : accessToken;

		return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
	}

	updateTokens(accessToken: string, refreshToken: string) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
	}
}
