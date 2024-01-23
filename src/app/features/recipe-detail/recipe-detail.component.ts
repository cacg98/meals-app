import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';

import { environment } from '../../../environments/environment.development';
import { IRecipe } from '../../common/interfaces/meals-responses';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  recipe!: IRecipe;

  ngOnInit(): void {
    this.route.data.subscribe(
      ({recipe}) => {
        this.recipe = recipe;
      }
    )
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }

}
