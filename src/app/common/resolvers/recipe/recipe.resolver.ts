import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

import { IRecipe } from '../../interfaces/meals-responses';
import { MealsService } from '../../services/meals/meals.service';
import { LoaderService } from '../../services/loader/loader.service';

export const recipeResolver: ResolveFn<Observable<IRecipe>> = (route, state) => {
  const router = inject(Router);
  const loaderService = inject(LoaderService);
  loaderService.showSpinner();

  return inject(MealsService).searchRecipe(route.params['path']).pipe(
    catchError(() => {
      // TODO not found component
      router.navigateByUrl('home');
      loaderService.hideSpinner();
      return EMPTY;
		})
  );
};
