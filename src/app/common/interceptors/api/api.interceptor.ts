import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

import { AuthTokensService } from '../../services/auth-tokens/auth-tokens.service';
import * as authEndpoints from '../../endpoints/auth';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	const authUrls = [
		authEndpoints.REGISTER,
		authEndpoints.LOGIN
	];

	if (authUrls.includes(req.url)) {
		return next(req);
	}

	const authTokensService = inject(AuthTokensService);

	if (req.url === authEndpoints.REFRESH_TOKEN) {
		const reqClone = authTokensService.addAuthorizationHeader(req);
		return next(reqClone);
	}

	if (authTokensService.isRefreshing) {
		return EMPTY;
	}

	if (!localStorage.getItem('accessToken')) {
		inject(Router).navigateByUrl('login');
		return EMPTY;
	}

	const reqClone = authTokensService.addAuthorizationHeader(req);
	return next(reqClone);
};
