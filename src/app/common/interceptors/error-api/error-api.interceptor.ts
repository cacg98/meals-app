import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { AuthTokensService } from '../../services/auth-tokens/auth-tokens.service';
import * as authEndpoints from '../../endpoints/auth';

export const errorApiInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);
	const authTokensService = inject(AuthTokensService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === HttpStatusCode.Unauthorized && req.url !== authEndpoints.REFRESH) {
				authTokensService.isRefreshing = true;

				return authService.refreshToken().pipe(
					concatMap((res) => {
						authTokensService.updateTokens(res.accessToken, res.refreshToken);

						const reqClone = authTokensService.addAuthorizationHeader(req);
						return next(reqClone);
					}),
					catchError(() => {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
            			inject(Router).navigateByUrl('login');
						return EMPTY;
					}),
					finalize(() => authTokensService.isRefreshing = false),
				);
			}
			return throwError(() => error);
		})
	);
};
