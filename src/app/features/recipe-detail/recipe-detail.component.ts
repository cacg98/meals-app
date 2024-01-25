import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';

import { environment } from '../../../environments/environment.development';
import { IRecipe } from '../../common/interfaces/meals-responses';
import { LoaderService } from '../../common/services/loader/loader.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);

  recipe!: IRecipe;
  showingPlaceholderImg: boolean = true;

  ngOnInit(): void {
    this.route.data.subscribe(
      ({recipe}) => {
        this.recipe = recipe;
        this.loaderService.hideSpinner();
      }
    )
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }

}
