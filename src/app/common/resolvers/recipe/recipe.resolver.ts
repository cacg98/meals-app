import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { MealsService } from '../../services/meals/meals.service';
import { IRecipe } from '../../interfaces/meals-responses';

export const recipeResolver: ResolveFn<Observable<IRecipe>> = (route, state) => {
  return inject(MealsService).searchRecipe(route.params['name']);
};
