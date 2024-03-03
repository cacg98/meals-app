import { Injectable, WritableSignal, signal } from '@angular/core';

import { IPreviewRecipe } from '../../interfaces/meals-responses';
import { IRecord } from '../../interfaces/records-responses';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  ingredients: WritableSignal<string[]> = signal([]);

  recipes: WritableSignal<IPreviewRecipe[]> = signal([]);

  activeIndex: WritableSignal<number> = signal(0);

  records: WritableSignal<IRecord[]> = signal([]);

  darkTheme: WritableSignal<boolean> = signal(false);

  resetState() {
    this.ingredients.set([]);
    this.recipes.set([]);
    this.activeIndex.set(0);
    this.records.set([]);
  }
}
