import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

import { AuthTokensService } from '../../services/auth-tokens/auth-tokens.service';
import * as authEndpoints from '../../endpoints/auth';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	
	if (req.url === authEndpoints.LOGIN) {
		return next(req);
	}

	const authTokensService = inject(AuthTokensService);

	if (req.url === authEndpoints.REFRESH) {
		const reqClone = authTokensService.addAuthorizationHeader(req);
		return next(reqClone);
	}

	if (authTokensService.isRefreshing) {
		return EMPTY;
	}

	if (!localStorage.getItem('accessToken')) {
		inject(Router).navigateByUrl('/');
		return EMPTY;
	}

	const reqClone = authTokensService.addAuthorizationHeader(req);
	return next(reqClone);
};
