import { Injectable, WritableSignal, signal } from '@angular/core';

import { IPreviewRecipe } from '../../interfaces/meals-responses';
import { IRecord } from '../../interfaces/records-responses';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  ingredients: WritableSignal<string[]> = signal([]);

  recipes: WritableSignal<IPreviewRecipe[]> = signal([]);

  activeIndex: WritableSignal<number> = signal(0);

  records: WritableSignal<IRecord[]> = signal([]);

  darkTheme: WritableSignal<boolean> = signal(false);

  isMobile: WritableSignal<boolean> = signal(false);

  recordsPage: WritableSignal<number> = signal(0);

  recordsSize: WritableSignal<number> = signal(5);

  totalRecords: WritableSignal<number> = signal(0);

  resetState() {
    this.ingredients.set([]);
    this.recipes.set([]);
    this.activeIndex.set(0);
    this.records.set([]);
    this.recordsPage.set(0);
    this.recordsSize.set(5);
    this.totalRecords.set(0);
  }
}
