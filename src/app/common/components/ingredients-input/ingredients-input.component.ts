import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './ingredients-input.component.html',
  styleUrl: './ingredients-input.component.scss'
})
export class IngredientsInputComponent {

  @Output() changeIngredients = new EventEmitter<string[]>();

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  ingredients: string[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.ingredients.push(value);
      this.changeIngredients.emit(this.ingredients);
    }

    event.chipInput!.clear();
  }

  remove(ingredient: string, index: number): void {
    this.ingredients.splice(index, 1);
    this.changeIngredients.emit(this.ingredients);
    this.announcer.announce(`Removed ${ingredient}`);
  }

  edit(ingredient: string, index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(ingredient, index);
      return;
    }

    this.ingredients[index] = value;
    this.changeIngredients.emit(this.ingredients);
  }
}
