import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { IRecipe } from '../../interfaces/meals-responses';
import { MealsService } from '../../services/meals/meals.service';
import { LoaderService } from '../../services/loader/loader.service';

export const recipeResolver: ResolveFn<Observable<IRecipe>> = (route, state) => {
  inject(LoaderService).showSpinner();

  return inject(MealsService).searchRecipe(route.params['path']);
};
