import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './ingredients-input.component.html',
  styleUrl: './ingredients-input.component.scss'
})
export class IngredientsInputComponent {

  @Input() ingredients: string[] = [];
  @Output() ingredientsChange = new EventEmitter<string[]>();

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.ingredients.push(value);
      this.ingredientsChange.emit(this.ingredients);
    }

    event.chipInput!.clear();
  }

  remove(ingredient: string, index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.emit(this.ingredients);
    this.announcer.announce(`Removed ${ingredient}`);
  }

  edit(ingredient: string, index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(ingredient, index);
      return;
    }

    this.ingredients[index] = value;
    this.ingredientsChange.emit(this.ingredients);
  }
}
