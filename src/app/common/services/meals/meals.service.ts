import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as mealsEndpoints from '../../endpoints/meals';
import * as mealsResponses from '../../interfaces/meals-responses';


@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private _httpClient = inject(HttpClient);
  
  searchByIngredients(ingredients: string) {
	  return this._httpClient.get<mealsResponses.IPreviewRecipe[]>(`${mealsEndpoints.SEARCH_BY_INGREDIENTS}/?ingredients=${ingredients}`);
  }

  searchRecipe(anchor: string) {
	  return this._httpClient.get<mealsResponses.IRecipe>(`${mealsEndpoints.SEARCH_RECIPE}/?anchor=${anchor}`);
  }
}
