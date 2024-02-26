import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../../../environments/environment';
import { IPreviewRecipe } from '../../interfaces/meals-responses';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: IPreviewRecipe;

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }
}
