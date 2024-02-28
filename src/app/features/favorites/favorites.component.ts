import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFavorite } from '../../common/interfaces/favorite';
import { IPreviewRecipe } from '../../common/interfaces/meals-responses';
import { RecipeCardComponent } from '../../common/components/recipe-card/recipe-card.component';
import { LoaderService } from '../../common/services/loader/loader.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export default class FavoritesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);

  recipes: IPreviewRecipe[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ favorites }) => {
      this.recipes = (favorites as IFavorite[]).map((favorite) => {
        const info = [];
        if (favorite.difficulty) info.push(favorite.difficulty);
        if (favorite.time) info.push(favorite.time);
        return {
          anchor: favorite.anchor,
          image: favorite.image,
          name: favorite.name,
          info: info,
        };
      });
      Promise.resolve(null).then(() => this.loaderService.hideSpinner());
    });
  }
}
