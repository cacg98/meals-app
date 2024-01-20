import { Injectable, WritableSignal, signal } from '@angular/core';

import { IPreviewRecipe } from '../../interfaces/meals-responses';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  ingredients: WritableSignal<string[]> = signal([]);

  recipes: WritableSignal<IPreviewRecipe[]> = signal([]);

  activeIndex: WritableSignal<number> = signal(0);
}
