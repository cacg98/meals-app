import { WritableSignal, signal } from "@angular/core";

import { IPreviewRecipe } from "../interfaces/meals-responses";

export const ingredients: WritableSignal<string[]> = signal([]);

export const recipes: WritableSignal<IPreviewRecipe[]> = signal([]);

export const activeIndex: WritableSignal<number> = signal(0);
