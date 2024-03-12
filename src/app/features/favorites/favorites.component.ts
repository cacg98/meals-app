import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IFavorite } from '../../common/interfaces/favorite';
import { IPreviewRecipe } from '../../common/interfaces/meals-responses';
import { RecipeCardComponent } from '../../common/components/recipe-card/recipe-card.component';
import { LoadMoreDirective } from '../../common/directives/load-more/load-more.directive';
import { LoaderService } from '../../common/services/loader/loader.service';
import { FavoritesService } from '../../common/services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatProgressSpinnerModule, RecipeCardComponent, LoadMoreDirective],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export default class FavoritesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);
  private favoritesService = inject(FavoritesService);

  recipes: IPreviewRecipe[] = [];
  showingLoadingMore: boolean = true;
  page: number = 0;

  ngOnInit(): void {
    this.route.data.subscribe(({ favorites }) => {
      this.recipes = this.mapFavoriteToRecipe(favorites as IFavorite[]);
      Promise.resolve(null).then(() => this.loaderService.hideSpinner());
    });
  }

  mapFavoriteToRecipe(favorites: IFavorite[]): IPreviewRecipe[] {
    // TODO crear mapper
    return favorites.map((favorite) => {
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
  }

  loadMore() {
    this.page++;
    this.favoritesService.listFavorites(this.page).subscribe({
      next: (res) => {
        if (res.length) {
          this.recipes = [...this.recipes, ...this.mapFavoriteToRecipe(res)];
        } else {
          this.showingLoadingMore = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
